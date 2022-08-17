import type { RequestEvent } from '@sveltejs/kit';
import PrismaClient from '$lib/prisma';

const prisma = new PrismaClient();

export async function api(request: RequestEvent, data?: Record<string, unknown>)
{
    let body = {};
    let status = 500;

    switch(request.request.method.toUpperCase())
    {
        case 'GET':
            body = await prisma.todo.findMany();
            status = 200;
            break;

        case 'POST':
            status = 201;
            body = await prisma.todo.create({
                data: {
                    text: data?.text as string,
                }
            });

            break;
        
        case 'DELETE':
            status = 200;
            body = await prisma.todo.delete({
                where:
                {
                    uid: request.params.uid
                }
            });
            break;

        case 'PATCH':
            status = 200;
            body = await prisma.todo.update({
                where:
                {
                    uid: request.params.uid
                },
                data: {
                    done: data?.done as boolean,
                    text: data?.text as string
                }
            });

            break;
        
    }

    if(request.request.method.toUpperCase() !== 'GET' 
        && request.request.headers.get('accept') !== 'application/json')
    {
        return {
            status: 303,
            headers:
            {
                'Location': '/'
            }
        }
    }

    return {
        status,
        body
    };
}