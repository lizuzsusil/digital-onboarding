import type {Metadata} from "next";

interface MetadataProviderProps {
    title?: string;
    description?: string;
    image?: string;
}

export const MetadataProvider = ({
                                     title = "Nagarik Customer Onboarding App",
                                     description = "Global IME Bank",
                                     image = "/gibl-516x516.png",
                                 }: MetadataProviderProps): Metadata => {
    return {
        metadataBase: new URL('http://localhost:3000'),
        alternates: {
            canonical: '/',
            languages: {
                'en-US': '/en-US',
            },
        },
        title,
        description,
        icons: {
            icon: image,
            shortcut: image,
            apple: [{url: image, sizes: "76x76"}, {url: image, sizes: "120x120"}, {url: image, sizes: "152x152"}, {url: image, sizes: "180x180"}],
        },
        openGraph: {
            title,
            description,
            images: [{url: image, width: 1200, height: 630, alt: description}],
        },
        twitter: {
            card: "summary",
            title,
            description,
            images: [image],
        },
    };
};
