import type { Todo } from '$lib/types/Todo';
import type { RequestEvent } from '@sveltejs/kit';
import { append } from 'svelte/internal';

let todos: Todo[] = [];

export async function api(request: RequestEvent, data?: Record<string, unknown>)
{
    let body = {};
    let status = 500;

    switch(request.request.method.toUpperCase())
    {
        case 'GET':
            body = todos;
            status = 200;
            break;

        case 'POST':
            if(!data) break;
            todos.push(data as Todo);

            status = 201;
            body = data;
            break;
        
        case 'DELETE':
            status = 200;
            body = todos.find(todo => todo.uid === request.params.uid) || {};

            todos = todos.filter(todo => todo.uid !== request.params.uid);
            break;

        case 'PATCH':
            if(!data) break;
            status = 200;
            
            todos = todos.map(todo =>
            {
                if(todo.uid === request.params.uid)
                {
                    if(data?.text)
                    {
                        todo.text = data.text as string;
                    }

                    if(data?.done !== undefined)
                    {
                        todo.done = data.done as boolean;
                    }
                }
                return todo;
            });

            body = todos.find(t => t.uid === request.params.uid) || {};


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