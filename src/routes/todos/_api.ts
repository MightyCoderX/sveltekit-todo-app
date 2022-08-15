import type { Todo } from '$lib/types/Todo';
import type { RequestEvent } from '@sveltejs/kit';

let todos: Todo[] = [];

export async function api(request: RequestEvent, todo?: Todo)
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
            if(!todo) break; 
            todos.push(todo);

            status = 201;
            body = todo;
        
        case 'DELETE':
            status = 200;
            body = todos.find(todo => todo.uid === request.params.uid) || {};

            todos = todos.filter(todo => todo.uid !== request.params.uid);
            break;
            
        
    }

    if(request.request.method.toUpperCase() !== 'GET')
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