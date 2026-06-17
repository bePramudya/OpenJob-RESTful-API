class NotificationListener {
	constructor(applicationsRepository, mailSender) {
		this._applicationsRepository = applicationsRepository;
		this._mailSender = mailSender;
		this.listen = this.listen.bind(this);
	}

	async listen(message) {
		try {
			const { application_id } = JSON.parse(message.content.toString());
			const detail =
				await this._applicationsRepository.getDetailForNotification(
					application_id,
				);

			if (!detail) {
				console.warn(`Application ${application_id} tidak ditemukan, skip.`);
				return;
			}

			const result = await this._mailSender.sendApplicationNotification({
				ownerEmail: detail.owner_email,
				applicantName: detail.applicant_name,
				applicantEmail: detail.applicant_email,
				appliedAt: detail.applied_at,
			});

			console.log("Email notifikasi terkirim:", result.messageId);
		} catch (error) {
			console.error("Gagal memproses pesan:", error.message);
		}
	}
}

export default NotificationListener;
