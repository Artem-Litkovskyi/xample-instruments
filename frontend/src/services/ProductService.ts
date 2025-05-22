import ValidationError from "../errors/ValidationError.tsx";

export async function get_products(category: string | undefined) {
    const response = await fetch(`/api/products/${category}`);

    const data = await response.json();

    if (!response.ok) {
        throw new ValidationError(response.statusText, data.detail);
    }

    return data;
}