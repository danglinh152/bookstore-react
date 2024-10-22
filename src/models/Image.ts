class Image {
    private imageId: number;
    private name?: string;
    private isIcon?: boolean;
    private path?: string;
    private data?: string;

    constructor(
        imageId: number,
        name?: string,
        isIcon?: boolean,
        path?: string,
        data?: string
    ) {
        this.imageId = imageId;
        this.name = name;
        this.isIcon = isIcon;
        this.path = path;
        this.data = data;
    }

    // Getter and Setter for imageId
    public getImageId(): number {
        return this.imageId;
    }

    public setImageId(imageId: number): void {
        this.imageId = imageId;
    }

    // Getter and Setter for name
    public getName(): string | undefined {
        return this.name;
    }

    public setName(name: string | undefined): void {
        this.name = name;
    }

    // Getter and Setter for isIcon
    public getIsIcon(): boolean | undefined {
        return this.isIcon;
    }

    public setIsIcon(isIcon: boolean | undefined): void {
        this.isIcon = isIcon;
    }

    // Getter and Setter for path
    public getPath(): string | undefined {
        return this.path;
    }

    public setPath(path: string | undefined): void {
        this.path = path;
    }

    // Getter and Setter for data
    public getData(): string | undefined {
        return this.data;
    }

    public setData(data: string | undefined): void {
        this.data = data;
    }
}

export default Image;
