<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit';
    
    
    export const load: Load = async ({ fetch }) =>
    {
        const res = await fetch('/todos.json');
        
        const data = await res.json();

        if(res.ok)
        {
            return {
                status: res.status,
                props: { todos: data }
            }
        }

        return {
            error: new Error(data.message)
        }
    }
</script>

<script lang="ts">
    import TodoItem from '$lib/TodoItem.svelte';
    import type { Todo } from '$lib/types/Todo';

    const title = 'Todos';

    export let todos: Todo[];
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="todos">
    <h1>{title}</h1>
    
    <form action="/todos.json" method="POST" class="new">
        <input
            type="text"
            name="text"
            aria-label="Add a todo"
            placeholder="+ type to add a todo"
        >
    </form>
    
    {#each todos as todo}
        <TodoItem {todo} />
    {/each}
</div>

<style>
    .todos
    {
        width: 100%;
        max-width: 42rem;
        margin: 0 auto;
        padding-top: 4rem;
    }

    .todos :global(input)
    {
        border: 1px solid transparent;
        outline: none;
    }

    .todos :global(input:focus-visible)
    {
        box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
        border: 1px solid #ff3e00;
    }

    .new
    {
        margin-bottom: 0.5rem;
    }

    .new input
    {
        font-size: 1.6rem;
        width: 100%;
        padding: 0.5em 1em 0.5em 1em;
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 0.5rem;
        text-align: center;
    }

    .new input::placeholder
    {
        color: #c4c4c4;
    }
</style>

