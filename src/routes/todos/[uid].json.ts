import type { RequestHandler } from '@sveltejs/kit';
import { api } from './_api';

export const DELETE: RequestHandler = async (request) =>
{
    return api(request);
}

export const PATCH: RequestHandler = async (request) =>
{
    const data = await request.request.formData();

    return api(request, {
        text: data.get('text')?.toString(),
        done: data.get('done') ? true : false
    });
}