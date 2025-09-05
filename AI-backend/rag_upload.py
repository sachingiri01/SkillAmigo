from pine import retriever
from upload import upload_text_to_pinecone
policies = [
    {
        "doc_id": "policy_1",
        "source": "manual",
        "doc_type": "user_policy",
        "raw_text": "General Conduct Policy: All users must engage respectfully with others while using the platform. Harassment, discrimination, bullying, or hate speech in any form will not be tolerated. Users are expected to maintain professional language and avoid offensive remarks in chats, reviews, or postings. Any violation will result in warnings and possible suspension. Continuous abusive behavior may lead to permanent removal. The goal is to ensure a safe and inclusive community for everyone."
    },
    {
        "doc_id": "policy_2",
        "source": "manual",
        "doc_type": "content_policy",
        "raw_text": "Content Authenticity Policy: All text, images, and media uploaded must represent accurate information. Misleading titles, false claims, or exaggerated descriptions are strictly prohibited. Plagiarized content copied from external sources without permission will be removed. Sellers must provide genuine service details and avoid clickbait. Honest and transparent listings build trust between users. Repeated violations will result in account suspension."
    },
    {
        "doc_id": "policy_3",
        "source": "manual",
        "doc_type": "security_policy",
        "raw_text": "Fraud Prevention Policy: Creating fake accounts or impersonating others is not allowed. Attempts to manipulate the system through scams, phishing, or payment fraud are taken very seriously. Users must only use verified details while registering. Any suspicious activity will be flagged for investigation. Fraudulent transactions will result in refunds being blocked and accounts suspended. Severe fraud attempts may be reported to legal authorities."
    },
    {
        "doc_id": "policy_4",
        "source": "manual",
        "doc_type": "ip_policy",
        "raw_text": "Intellectual Property Policy: Users may not upload content that infringes copyrights, trademarks, or patents. If you are using third-party materials, proper permissions and licenses must be obtained. Sellers should only publish original work or services they own. Claims of IP infringement will be investigated promptly. Violating users may be required to remove or edit their content. Repeated infringement will result in permanent account termination."
    },
    {
        "doc_id": "policy_5",
        "source": "manual",
        "doc_type": "privacy_policy",
        "raw_text": "Data Privacy Policy: Personal information such as email, phone number, or addresses must not be shared publicly. Contact details should only be exchanged through secure platform channels. Users are prohibited from selling or misusing another user's data. The platform ensures encryption and data safety measures. Violations will lead to immediate removal of the offending content. Trust and privacy protection are the foundation of our system."
    },
    {
        "doc_id": "policy_6",
        "source": "manual",
        "doc_type": "pricing_policy",
        "raw_text": "Fair Pricing Policy: Service providers must list realistic and transparent prices. Artificial price inflation or bait-and-switch tactics are not acceptable. Average and minimum prices should reflect genuine effort and market standards. Overcharging users by hiding extra fees is prohibited. The platform may review suspicious pricing patterns. Consistent pricing abuse may result in restrictions on selling privileges."
    },
    {
        "doc_id": "policy_7",
        "source": "manual",
        "doc_type": "payment_policy",
        "raw_text": "Payment Policy: All financial transactions must be conducted only through official platform channels. Off-platform payments increase risks and are strictly forbidden. Users attempting to bypass payment gateways will face account restrictions. Sellers are required to maintain accurate payout information. Refunds and buyer protections are only available for platform-verified payments. Violations may result in earnings being withheld or accounts suspended."
    },
    {
        "doc_id": "policy_8",
        "source": "manual",
        "doc_type": "refund_policy",
        "raw_text": "Cancellation & Refund Policy: Buyers may request cancellations within the allowed timeframe. Sellers are expected to honor valid cancellation requests promptly. Refunds will be processed according to platform guidelines. If disputes arise, both parties must cooperate with the support team. Abuse of cancellations, such as repeated fake orders, will not be tolerated. Protecting both buyer and seller interests is the primary goal."
    },
    {
        "doc_id": "policy_9",
        "source": "manual",
        "doc_type": "verification_policy",
        "raw_text": "User Verification Policy: Verified badges are provided only after a strict review process. Misrepresentation of identity or using fake documents is prohibited. Verification ensures trust between buyers and sellers. Only genuine information, including legal names and IDs, will be accepted. Attempts to cheat verification will result in rejection and penalties. Maintaining a trusted ecosystem is essential for platform growth."
    },
    {
        "doc_id": "policy_10",
        "source": "manual",
        "doc_type": "review_policy",
        "raw_text": "Review & Rating Policy: Reviews must be based on real user experiences. Fake reviews, whether positive or negative, are not allowed. Users must not incentivize others to manipulate ratings. The platform monitors suspicious review behavior regularly. Honest feedback helps maintain trust and transparency. Violators may lose the ability to leave or receive reviews."
    },
    {
        "doc_id": "policy_11",
        "source": "manual",
        "doc_type": "promotion_policy",
        "raw_text": "Advertising & Promotion Policy: Users must not send unsolicited messages, spam, or irrelevant promotions. Advertising external products or services without permission is prohibited. Mass messaging to random users is considered spam. Only authorized promotional content is allowed through official channels. Misuse of promotion tools will lead to restrictions. The aim is to keep user experience clean and spam-free."
    },
    {
        "doc_id": "policy_12",
        "source": "manual",
        "doc_type": "content_policy",
        "raw_text": "NSFW & Prohibited Content Policy: Uploading adult, violent, or otherwise restricted content is forbidden. The platform does not allow pornographic, hateful, or dangerous material. Services related to illegal activities are strictly prohibited. Sellers must ensure their offerings comply with community standards. Violations will result in immediate content removal. Severe cases may lead to law enforcement involvement."
    },
    {
        "doc_id": "policy_13",
        "source": "manual",
        "doc_type": "dispute_policy",
        "raw_text": "Dispute Resolution Policy: When disputes occur, both buyers and sellers are expected to cooperate. The support team will investigate disputes fairly and impartially. Evidence such as chat logs or transaction records may be requested. Users must remain respectful during dispute resolution. Failure to cooperate may result in penalties. The goal is to resolve conflicts quickly while protecting both parties."
    },
    {
        "doc_id": "policy_14",
        "source": "manual",
        "doc_type": "account_policy",
        "raw_text": "Account Suspension Policy: Accounts that repeatedly violate policies will be suspended temporarily. In cases of severe violations, permanent bans may be applied. Suspended users lose access to posting, messaging, and transactions. Reinstatement may be considered only after thorough review. Users may appeal suspensions with valid evidence. This ensures accountability and fairness across the platform."
    },
    {
        "doc_id": "policy_15",
        "source": "manual",
        "doc_type": "security_policy",
        "raw_text": "System Exploitation Policy: Any attempt to exploit bugs, vulnerabilities, or loopholes is forbidden. Users must report discovered issues to the support team immediately. Exploiting flaws for personal gain will result in strict action. Technical investigations may be conducted on reported accounts. Severe violations may lead to permanent bans or legal steps. The platform prioritizes system stability and security."
    }
]


def rag_upload():
    uploaded, failed = 0, 0
    errors = []

    for policy in policies:
        try:
            result = upload_text_to_pinecone(
                raw_text=policy["raw_text"],
                doc_id=policy["doc_id"],
                source=policy["source"],
                doc_type=policy["doc_type"]
            )
            if result.get("status") == "success":
                uploaded += 1
            else:
                failed += 1
                errors.append(result.get("msg", "Unknown error"))
        except Exception as e:
            failed += 1
            errors.append(str(e))

    return {
        "result":result,
        "success": failed == 0,
        "uploaded": uploaded,
        "failed": failed,
        "errors": errors
    }