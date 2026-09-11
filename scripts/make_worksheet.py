from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether

OUT = Path(__file__).resolve().parents[1] / "assets" / "latin-six-foundations-worksheet.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)
pdfmetrics.registerFont(TTFont("DejaVu", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DejaVu-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("DejaVu-Serif-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"))
WINE = colors.HexColor("#54243b")
GOLD = colors.HexColor("#e8b74f")
INK = colors.HexColor("#261d22")
CREAM = colors.HexColor("#fffaf0")
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="TitleWine", parent=styles["Title"], textColor=WINE, fontName="DejaVu-Serif-Bold", fontSize=24, leading=28, alignment=TA_CENTER, spaceAfter=8))
styles.add(ParagraphStyle(name="Section", parent=styles["Heading2"], textColor=WINE, fontName="DejaVu-Serif-Bold", fontSize=15, leading=18, spaceBefore=6, spaceAfter=6))
styles.add(ParagraphStyle(name="Q", parent=styles["BodyText"], textColor=INK, fontName="DejaVu", fontSize=10.5, leading=14, spaceAfter=2))
styles.add(ParagraphStyle(name="Small", parent=styles["BodyText"], textColor=colors.HexColor("#675b60"), fontName="DejaVu", fontSize=8.5, leading=11))

sections = [
    ("1. Word roles", ["Underline the subject and circle the object: The enormous furry dog chased the frightened little cat.", "Label S, V and O: Marcus carries the water.", "Write your own subject-verb-object sentence."]),
    ("2. Endings are role labels", ["puella puerum amat. Who loves whom? Explain which endings helped.", "puerum puella amat. Has the meaning changed? Why?"]),
    ("3. High-frequency words", ["Match puer, puella, aqua, via, amicus with: girl, road, boy, friend, water.", "Translate: puella aquam portat."]),
    ("4. English grammar", ["Define noun, verb and adjective in your own words.", "In 'The small dog runs quickly', identify the adjective and adverb."]),
    ("5. Word families", ["Write one English relative of each: aqua, video, audio, porto.", "What might 'portable' have to do with porto (I carry)?"]),
    ("6. Tiny translations", ["Translate: canis currit.", "Translate: puer canem videt.", "Translate: puella aquam portat.", "Explain how an ending helped you solve one sentence."]),
]

def footer(canvas, doc):
    canvas.saveState(); canvas.setStrokeColor(GOLD); canvas.line(18*mm, 14*mm, 192*mm, 14*mm)
    canvas.setFont("DejaVu", 8); canvas.setFillColor(colors.HexColor("#71666b")); canvas.drawString(18*mm, 9*mm, "Learn Latin - Dad + Sai")
    canvas.drawRightString(192*mm, 9*mm, f"Page {doc.page}"); canvas.restoreState()

def answer_lines(n=2):
    rows=[[""] for _ in range(n)]
    t=Table(rows, colWidths=[170*mm], rowHeights=[7*mm]*n)
    t.setStyle(TableStyle([("LINEBELOW",(0,0),(-1,-1),0.35,colors.HexColor("#8d8580"))]))
    return t

story=[Paragraph("LATIN GRAMMAR HEAD-START", styles["TitleWine"]), Paragraph("Six foundations to learn before class gets there", ParagraphStyle(name="Sub",parent=styles["BodyText"],alignment=TA_CENTER,textColor=WINE,fontSize=12,spaceAfter=12)), Paragraph("Name: ________________________________     Date: __________________",styles["Q"]), Spacer(1,5*mm)]
for title, questions in sections:
    block=[Paragraph(title,styles["Section"])]
    for i,q in enumerate(questions,1):
        block += [Paragraph(f"<b>{i}.</b> {q}",styles["Q"]),answer_lines(2 if len(q)>55 else 1),Spacer(1,2*mm)]
    story.append(KeepTogether(block))

story += [PageBreak(), Paragraph("PARENT / TEACHER ANSWER GUIDE",styles["TitleWine"]), Paragraph("Ask 'How do you know?' as well as checking the final answer. Accurate reasoning matters more than a lucky answer.",styles["Small"]), Spacer(1,5*mm)]
answers=[("1. Word roles","Subject: The enormous furry dog. Object: the frightened little cat. Marcus = S; carries = V; water = O."),("2. Endings","The girl loves the boy in both orders. puella is nominative; puerum is accusative."),("3. Words","puer boy; puella girl; aqua water; via road; amicus friend. The girl carries water."),("4. Grammar","A noun names; a verb expresses action/state; an adjective describes a noun. small = adjective; quickly = adverb."),("5. Families","Examples: aquatic, visible/video, audible/audio, portable/transport. Portable means able to be carried."),("6. Translation","The dog runs. The boy sees the dog. The girl carries water. Explanations should refer to endings/roles.")]
for h,a in answers:
    story += [Paragraph(h,styles["Section"]),Paragraph(a,styles["Q"]),Spacer(1,3*mm)]

doc=SimpleDocTemplate(str(OUT),pagesize=A4,rightMargin=18*mm,leftMargin=18*mm,topMargin=16*mm,bottomMargin=18*mm,title="Latin Grammar Head-Start Worksheet",author="Learn Latin")
doc.build(story,onFirstPage=footer,onLaterPages=footer)
print(OUT)
