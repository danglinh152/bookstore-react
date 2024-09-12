class Book {
    private bookId: string;
    private title?: string;
    private author?: string;
    private isbn?: string;
    private description?: string;
    private listPrice?: number;
    private sellingPrice?: number;
    private quantity?: number;
    private avgRate?: number;

    constructor(
        bookId: string,
        title?: string,
        author?: string,
        isbn?: string,
        description?: string,
        listPrice?: number,
        sellingPrice?: number,
        quantity?: number,
        avgRate?: number,
    ) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.description = description;
        this.listPrice = listPrice;
        this.sellingPrice = sellingPrice;
        this.quantity = quantity;
        this.avgRate = avgRate;
    }

    public getBookId(): string {
        return this.bookId;
    }

    public setBookId(bookId: string): void {
        this.bookId = bookId;
    }

    public getTitle(): string | undefined {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getAuthor(): string | undefined {
        return this.author;
    }

    public setAuthor(author: string): void {
        this.author = author;
    }

    public getIsbn(): string | undefined {
        return this.isbn;
    }

    public setIsbn(isbn: string): void {
        this.isbn = isbn;
    }

    public getDescription(): string | undefined {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getListPrice(): number | undefined {
        return this.listPrice;
    }

    public setListPrice(listPrice: number): void {
        this.listPrice = listPrice;
    }

    public getSellingPrice(): number | undefined {
        return this.sellingPrice;
    }

    public setSellingPrice(sellingPrice: number): void {
        this.sellingPrice = sellingPrice;
    }

    public getQuantity(): number | undefined {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    public getAvgRate(): number | undefined {
        return this.avgRate;
    }

    public setAvgRate(avgRate: number): void {
        this.avgRate = avgRate;
    }

}

export default Book;
