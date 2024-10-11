class Feedback {
    private feedbackId: number;
    private feedback: string;
    private rate: number;

    constructor(
        feedbackId: number,
        feedback: string,
        rate: number) {
        this.feedbackId = feedbackId;
        this.feedback = feedback;
        this.rate = rate;
    }

    // Getters
    public getFeedbackId(): number {
        return this.feedbackId;
    }

    public getFeedback(): string {
        return this.feedback;
    }

    public getRate(): number {
        return this.rate;
    }

    // Setters
    public setFeedbackId(feedbackId: number): void {
        this.feedbackId = feedbackId;
    }

    public setFeedback(feedback: string): void {
        this.feedback = feedback;
    }

    public setRate(rate: number): void {
        this.rate = rate;
    }
}

export default Feedback;
