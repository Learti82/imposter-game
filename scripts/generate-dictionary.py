"""Build the compact single-word game dataset from open Albanian lexical sources."""

from __future__ import annotations

import ast
import csv
import json
import re
import sys
from pathlib import Path

TARGET_EASY = 3000
TARGET_MEDIUM = 4500
TARGET_HARD = 5000
WORD_RE = re.compile(r"^[A-ZÇË]{3,20}$")
ALLOWED_TYPES = ("m.", "f.", "mb.", "kal.", "jokal.", "vetv.", "ndajf.")
BLOCKED_TYPES = ("përem.", "parafj.", "lidh.", "pjes.", "pasth.", "num.", "nyj.")
BLOCKED_WORDS = {
    "unë", "ti", "ai", "ajo", "ata", "ato", "ne", "ju", "këtë", "këta", "këto", "çfarë",
    "është", "jam", "janë", "ishte", "dhe", "ose", "por", "nuk", "nga", "për", "kur", "kush",
    "sepse", "sikur", "edhe", "vetëm", "mut", "kar", "kurvë", "pidh", "qij", "qirë",
}

DOMAIN_RULES = (
    (("bot.",), "Bimë"), (("zool.", "ornit."), "Kafshë"), (("mjek.", "anat."), "Mjekësi"),
    (("kim.",), "Kimi"), (("fiz.",), "Fizikë"), (("astr.",), "Astronomi"),
    (("muz.",), "Muzikë"), (("sport.",), "Sport"), (("det.",), "Detari"),
    (("usht.",), "Ushtri"), (("tekn.", "inform."), "Teknologji"), (("gjuh.",), "Gjuhë"),
    (("let.",), "Letërsi"), (("hist.", "arkeol."), "Histori"), (("gjeogr.", "gjeol."), "Gjeografi"),
    (("etnogr.",), "Kulturë"), (("bujq.", "blegt."), "Bujqësi"), (("ekon.", "fin."), "Ekonomi"),
    (("jur.",), "Drejtësi"), (("filoz.", "psikol."), "Koncepte"),
)

KEYWORD_RULES = (
    (("bimë", "pemë", "shkurre", "barishte", "lule"), "Bimë"),
    (("kafshë", "shpend", "peshk", "insekt", "gjitar", "zvarranik"), "Kafshë"),
    (("ushqim", "gjellë", "ëmbëlsirë", "pije", "hahet", "gatuhet"), "Ushqime"),
    (("vegël", "pajisje", "enë që", "mjet që", "aparat"), "Objekte dhe mjete"),
    (("punëtor", "punonjës", "mjeshtër", "profesion"), "Profesione"),
    (("ndjenjë", "gjendje shpirtërore"), "Emocione"),
    (("qytet", "shtet", "krahinë", "vendbanim"), "Vende"),
    (("veshje", "rrobë", "vishet"), "Veshje"),
    (("mobilie", "dhomë e", "shtëpi"), "Shtëpi"),
    (("sport", "lojë me", "garë sportive"), "Sport"),
)

def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text.replace("~", "").replace("\u00ad", "")).strip(" '\".,;:")


def clip(text: str, limit: int) -> str:
    clipped = text
    if len(clipped) > limit:
        clauses = [normalize(part) for part in re.split(r"\s*[;,]\s*", clipped) if normalize(part)]
        selected = ""
        for clause in clauses:
            candidate = f"{selected}, {clause}" if selected else clause
            if len(candidate) > limit:
                break
            selected = candidate
            if len(selected) >= 45:
                break
        clipped = selected or clipped[:limit].rsplit(" ", 1)[0]
    clipped = re.sub(r"\s*\([^)]*$", "", clipped)
    return clipped.rstrip(" ,;:")


def read_definition(raw: str) -> list[str]:
    try:
        value = ast.literal_eval(raw)
    except (SyntaxError, ValueError):
        return []
    if isinstance(value, str):
        value = [value]
    return [normalize(str(item)) for item in value if normalize(str(item))]


def sentences(definitions: list[str], word: str) -> list[str]:
    pieces: list[str] = []
    for definition in definitions[:3]:
        cleaned = re.sub(r"^\d+\.\s*", "", definition)
        for part in re.split(r"(?<=[.!?])\s+|\s*[;]\s*", cleaned):
            part = normalize(re.sub(r"^\d+\.\s*", "", part))
            if 24 <= len(part) <= 220 and "shih " not in part.casefold() and word.casefold() not in part.casefold():
                pieces.append(part)
    return pieces


def category_for(type_text: str, definition: str) -> str:
    lowered_type = type_text.casefold()
    for needles, category in DOMAIN_RULES:
        if any(needle in lowered_type for needle in needles):
            return category
    lowered_definition = definition.casefold()
    for needles, category in KEYWORD_RULES:
        if any(needle in lowered_definition for needle in needles):
            return category
    if lowered_type.startswith(("kal.", "jokal.", "vetv.")):
        return "Veprime"
    if lowered_type.startswith("mb."):
        return "Cilësi"
    if lowered_type.startswith("ndajf."):
        return "Mënyra dhe shprehje"
    return "Fjalë shqipe"


def easy_hint(parts: list[str]) -> str:
    return clip(parts[0], 175) + "."


def medium_hint(parts: list[str], category: str) -> str:
    clue = parts[0]
    if len(parts) > 1 and len(parts[1]) < len(clue):
        clue = parts[1]
    return clip(clue, 150) + "."


def hard_hint(parts: list[str], category: str, word: str) -> str:
    stem = word[:5].casefold()
    safe_parts = [part for part in parts if stem not in part.casefold()]
    if not safe_parts:
        return ""
    source = safe_parts[1] if len(safe_parts) > 1 else safe_parts[0]
    clauses = [normalize(item) for item in re.split(r"\s*,\s*|\s*:\s*", source) if len(normalize(item)) >= 22]
    clue = clauses[-1] if clauses else source
    if len(clue) < 38 and len(safe_parts) > 2:
        clue = safe_parts[2]
    return f"Në fushën «{category}»: {clip(clue, 125)}."


def main() -> None:
    if len(sys.argv) != 4:
        raise SystemExit("Përdorimi: generate-dictionary.py words.csv sq_50k.txt output.ts")
    dictionary_path, frequency_path, output_path = map(Path, sys.argv[1:])
    frequency: dict[str, int] = {}
    with frequency_path.open(encoding="utf-8") as source:
        for index, line in enumerate(source):
            word = line.rsplit(" ", 1)[0].strip().casefold()
            if word and word not in frequency:
                frequency[word] = index

    candidates: dict[str, dict] = {}
    with dictionary_path.open(encoding="utf-8", newline="") as source:
        for row in csv.DictReader(source):
            original = (row.get("word") or "").strip()
            type_text = (row.get("type") or "").strip()
            if not WORD_RE.fullmatch(original) or original.casefold() in BLOCKED_WORDS or any(tag in type_text.casefold() for tag in BLOCKED_TYPES):
                continue
            if not type_text.casefold().startswith(ALLOWED_TYPES):
                continue
            word = original.casefold()
            definitions = read_definition(row.get("definition") or "")
            parts = sentences(definitions, word)
            if not parts:
                continue
            category = category_for(type_text, parts[0])
            specialized = category not in {"Fjalë shqipe", "Cilësi", "Veprime", "Mënyra dhe shprehje"}
            candidate = {
                "word": word,
                "parts": parts,
                "category": category,
                "rank": frequency.get(word, 1_000_000),
                "specialized": specialized,
            }
            previous = candidates.get(word)
            if previous is None or (not candidate["specialized"], -len(parts[0])) > (not previous["specialized"], -len(previous["parts"][0])):
                candidates[word] = candidate

    pool = list(candidates.values())
    easy_pool = sorted((item for item in pool if item["rank"] < 24_000 and len(item["word"]) <= 13), key=lambda item: item["rank"])
    easy = easy_pool[:TARGET_EASY]
    used = {item["word"] for item in easy}

    medium_pool = sorted((item for item in pool if item["word"] not in used and item["rank"] < 50_000), key=lambda item: (item["rank"], len(item["word"])))
    medium = medium_pool[:TARGET_MEDIUM]
    used.update(item["word"] for item in medium)

    hard_pool = sorted((item for item in pool if item["word"] not in used), key=lambda item: (not item["specialized"], -len(item["word"]), item["word"]))
    hard = hard_pool

    rows: list[list[str]] = []
    targets = {"easy": len(easy), "medium": len(medium), "hard": TARGET_HARD}
    for difficulty, selected in (("easy", easy), ("medium", medium), ("hard", hard)):
        for item in selected:
            hint = easy_hint(item["parts"]) if difficulty == "easy" else medium_hint(item["parts"], item["category"]) if difficulty == "medium" else hard_hint(item["parts"], item["category"], item["word"])
            if not hint or item["word"] in hint.casefold():
                continue
            rows.append([item["word"], hint, item["category"], difficulty])
            if sum(1 for row in rows if row[3] == difficulty) >= targets[difficulty]:
                break

    if len(rows) < 10_000:
        raise SystemExit(f"U gjeneruan vetëm {len(rows)} fjalë")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", encoding="utf-8", newline="\n") as output:
        output.write("// Generated from AlbanianLanguage definitions and FrequencyWords rankings.\n")
        output.write("// See THIRD_PARTY_DATA.md. Every entry is one orthographic word.\n")
        output.write("import type { Difficulty } from '../types/game'\n\n")
        output.write("export type GeneratedWordRow = readonly [string, string, string, Difficulty]\n")
        output.write("export const GENERATED_WORD_ROWS: readonly GeneratedWordRow[] = [\n")
        for row in rows:
            output.write("  " + json.dumps(row, ensure_ascii=False, separators=(",", ":")) + ",\n")
        output.write("]\n")
    counts = {level: sum(1 for row in rows if row[3] == level) for level in ("easy", "medium", "hard")}
    print(f"U gjeneruan {len(rows)} fjalë të vetme: {counts}")


if __name__ == "__main__":
    main()
