export async function get() {
    const guides = [
        { id: 1, title: 'som title 1' },
        { id: 2, title: 'som title 2' },
        { id: 13, title: 'som title 13' },
        { id: 143, title: 'som title 143' },
        { id: 144, title: 'som title 144' },
    ]
    return {
        status: 200,
        body: { guides }
    }
}
