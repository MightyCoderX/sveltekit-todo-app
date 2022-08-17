import type { RequestHandler } from '@sveltejs/kit';
import type { Todo } from '$lib/types/Todo';
import { api } from './_api';


export const GET: RequestHandler = async (request) =>
{
    return api(request);
}

export const POST: RequestHandler = async (request) =>
{
    const data = await request.request.formData();

    return api(request, {
        text: data.get('text')?.toString() || '',
        done: false
    });
}