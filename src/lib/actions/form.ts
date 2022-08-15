export const enhance = (form: HTMLFormElement, {
    result,
    error
}: {
    result: (res: Response, form: HTMLFormElement) => void | Promise<void>,
    error: (res: Response | unknown, form?: HTMLFormElement) => void | Promise<void>
}) =>
{
    const handleSubmit = async (e: SubmitEvent) =>
    {
        e.preventDefault();

        try
        {
            const body = new FormData(form);
            const res = await fetch(form.action, {
                method: form.getAttribute('method') || undefined,
                headers: {
                    'Accept': 'application/json'
                },
                body
            });

            if(res.ok)
            {
                result(res, form);
            }
            else
            {
                console.error('Fetch error', await res.text());
                error(res, form);
            }
        }
        catch (err)
        {
            console.error('Fetch error: ', err);
            error(err);
        }
    }

    form.addEventListener('submit', handleSubmit);

    return {
        destroy()
        {
            form.removeEventListener('submit', handleSubmit);
        }
    }
}