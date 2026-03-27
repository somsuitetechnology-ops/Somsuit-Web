import type { OfferedService } from "@/lib/cms-api";

/**
 * Service-based agreement draft: readable Part A (scope) + Part B (general terms).
 * Not legal advice — counsel should review before signature.
 */

const GENERAL_TERMS_AND_RULES = `
PART B — General terms, rules, and regulations

Part B sets out the legal and commercial rules that sit alongside Part A. Read both parts together. Replace placeholders, add your governing law, and attach fee schedules as needed.

6. Definitions
"Provider" means the company providing the services. "Client" means the counterparty named on this agreement. "Deliverables" means the outputs described in Part A, in a statement of work, or in a written change request.

7. Fees, invoicing, and taxes
Fees, currency, milestones, and taxes follow the proposal or fee schedule you attach or reference. Unless you state otherwise in writing, invoices are due within thirty (30) days. Late payment interest may apply as allowed by law or as you agree in a schedule.

8. Change control
Changes to scope, dates, or price need a written change request that both sides accept (email can count if you agree that in advance).

9. Confidentiality
Each party will use the other party's non-public information only for this engagement and will protect it with reasonable care. Usual exceptions apply: information that is already public, received lawfully from others, or developed independently without using the other party's secrets.

10. Data protection and privacy
If personal data is processed, both parties follow applicable privacy laws and any data-processing terms they sign. Each party cooperates reasonably with lawful data requests.

11. Intellectual property
What each party already owned stays theirs. Who owns new work product follows your written deal (for example: assignment to Client after payment, or a licence). Client lets Provider use Client marks and materials only as needed to perform the work.

12. Warranties and professional standard
Provider will perform in a professional way consistent with common industry practice. Apart from what is expressly written, implied warranties are disclaimed where the law allows.

13. Limitation of liability
Neither side is liable for indirect, special, or consequential damages. Direct damages may be capped (for example to fees paid in the last twelve months), except where the law does not allow a cap.

14. Indemnity
Each party may indemnify the other against third-party claims arising from the indemnifying party's gross negligence or wilful wrongdoing, with prompt notice and cooperation, as you spell out in a schedule if needed.

15. Force majeure
Neither party is liable for delay or failure caused by events outside reasonable control (for example major outages, strikes, or government action), if they notify the other and try to reduce harm.

16. Term, suspension, and termination
Either party may end the agreement for serious breach that is not fixed after reasonable notice, or as otherwise agreed. Provider may pause work if invoices are seriously overdue, where that is fair and notice is given when practical. Clauses that should survive (fees due, confidentiality, IP, limits on liability) continue after termination.

17. Independent businesses; non-solicitation
The parties are independent contractors, not partners or joint employers. Any non-solicit or non-compete terms must be written in a schedule and must follow employment and competition law.

18. Notices
Notices can go to the email addresses on this agreement unless you update them in writing.

19. Governing law and disputes
State your governing law, courts, or arbitration in Schedule 1. If you leave this blank, Provider's home jurisdiction may apply (excluding "conflict of law" rules that point elsewhere), but you should always choose explicit wording with a lawyer.

20. Entire agreement; severability; waiver
This document plus Part A, Part B, and any schedules is the whole agreement on this topic. If one clause is invalid, the rest remains. Waivers must be in writing; not enforcing a right once does not mean it is waived forever.

21. Counterparts and electronic signature
This agreement may be signed in separate copies. Electronic signatures and reliable electronic records count as originals where the law allows.

—
Reminder: this text is a drafting starting point only, not legal advice. Adapt fees, liability caps, governing law, and industry rules with qualified counsel.
`.trim();

export function buildFullServiceAgreementFromCatalog(
  s: OfferedService
): string {
  const lines: string[] = [];
  lines.push("PART A — Scope of work (what you are buying)");
  lines.push("");
  lines.push(
    "Start here. Part A is written in plain language so both sides can see what will be delivered, what the client must provide, and how long work is expected to take. Replace placeholder or test text with real project details before anyone signs."
  );
  lines.push("");
  lines.push(`Service name: ${s.name.trim()}`);
  if (s.tagline?.trim()) {
    lines.push(`One-line summary: ${s.tagline.trim()}`);
  }
  lines.push("");
  lines.push("1. What we will do (description of services)");
  lines.push(s.description.trim());
  if (s.deliverables?.trim()) {
    lines.push("");
    lines.push("2. What you will receive (deliverables and inclusions)");
    lines.push(s.deliverables.trim());
  }
  if (s.prerequisites?.trim()) {
    lines.push("");
    lines.push("3. What we need from you (prerequisites and assumptions)");
    lines.push(s.prerequisites.trim());
  }
  if (s.processNotes?.trim()) {
    lines.push("");
    lines.push("4. How we will work together (delivery approach)");
    lines.push(s.processNotes.trim());
  }
  if (s.typicalDuration?.trim()) {
    lines.push("");
    lines.push("5. Expected duration (indicative only)");
    lines.push(
      `Rough timeframe: ${s.typicalDuration.trim()} (this is a planning estimate, not a guarantee, unless you fix dates in a separate schedule).`
    );
  }
  lines.push("");
  lines.push(
    "— End of Part A — Part B below contains standard legal and commercial rules that support this scope. —"
  );
  lines.push("");
  lines.push(GENERAL_TERMS_AND_RULES);
  return lines.join("\n");
}
