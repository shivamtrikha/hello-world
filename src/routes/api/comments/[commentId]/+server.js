import { json } from "@sveltejs/kit";
import { comments } from "$lib/comments.js";

export function GET(requestEvent) {
    const { params } = requestEvent;
    const { commentId } = params;
    const comment = comments.find((comment) => comment.id === parseInt(commentId));
    return json(comment)
}
//Patch Request means update the text of an array
export async function PATCH(requestEvent) {
    const { params, request } = requestEvent;
    const { commentId } = params
    const { text } = await request.json()
    const comment = comments.find((comment) => comment.id === parseInt(commentId));
    comment.text = text
    return json(comment);
}

//Delete handle request 
export async function DELETE(requestEvent) {
    const { params } = requestEvent
    const { commentId } = params
    const deletedcomment = comments.find((comment) => comment.id === parseInt(commentId));
    const index = comments.find((comment) => comment.id === parseInt(commentId));
    comments.splice(index, 1)
    return json(deletedcomment)
}