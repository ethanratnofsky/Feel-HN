import { Comment } from "./types";

/**
 * Creates a comment tree from an array of comments.
 *
 * @param {Comment[]} comments - The array of comments.
 * @returns {Comment[]} - The comment tree.
 */
const createCommentTree = (comments: Comment[]): Comment[] => {
    const commentTree: Comment[] = []; // Initialize an empty array to store the comment tree
    const stack: Comment[] = []; // Initialize an empty stack to keep track of parent comments

    for (const comment of comments) {
        const currentIndent = comment.indent;

        // Pop comments from the stack until we find the parent comment for the current comment
        while (stack.length > 0 && stack[stack.length - 1].indent >= currentIndent) {
            stack.pop();
        }

        if (stack.length > 0) {
            const parent = stack[stack.length - 1]; // Get the parent comment from the top of the stack
            parent.replies.push(comment); // Add the current comment as a reply to its parent comment
        } else {
            commentTree.push(comment); // If there is no parent comment, add the current comment to the comment tree
        }

        stack.push(comment); // Push the current comment to the stack
    }

    return commentTree; // Return the comment tree
};

const main = (): void => {
    // Get the item ID
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get("id");

    if (!itemId) {
        console.warn("[Feel HN] No item ID found.");
        return;
    }

    // Get the post node
    const postNode = document.querySelector("table.fatitem");

    if (!postNode) {
        console.warn("[Feel HN] No post node found.");
        return;
    }

    // Parse the OP and the post content
    const op = postNode.querySelector(".hnuser")?.textContent || "Unknown";
    const postContent = postNode.querySelector(".toptext")?.textContent || "";

    console.log("[Feel HN] OP: " + op);
    console.log("[Feel HN] Post Content: " + postContent);

    // Get the comment tree node
    const commentTreeNode = document.querySelector(".comment-tree");

    if (!commentTreeNode) {
        console.log("[Feel HN] No comment tree node found.");
        return;
    }

    const commentsNodeList = commentTreeNode.querySelectorAll(".athing.comtr");

    // Parse the comments
    const comments = Array.from(commentsNodeList).map((commentNode) => {
        const indent = commentNode.querySelector(".ind")?.getAttribute("indent") || "0";

        return ({
            indent: parseInt(indent),
            id: commentNode.getAttribute("id") || "",
            author: commentNode.querySelector(".comhead > .hnuser")?.textContent || "Unknown",
            comment: commentNode.querySelector(".comment > .commtext")?.textContent || "",
            replies: [],
        });
    });

    comments.forEach(({ id }) => {
        const commentNode = document.getElementById(id);

        if (!commentNode) {
            console.warn(`[Feel HN] Comment with ID ${id} not found.`);
            return;
        }

        const commentSentimentAnalysis = `TODO: SA for Comment ID #${id}`

        commentNode.querySelector("td.default > div")?.insertAdjacentHTML("beforeend", `<b>${commentSentimentAnalysis}</b>`);
    })

    // TODO: Run sentiment analysis considering replies

    // Construct an object that represents the comment tree
    // const commentTree = createCommentTree(comments);

    // postNode.insertAdjacentHTML("beforebegin", `<details><summary>Feel HN</summary><pre>${JSON.stringify(commentTree, null, 2)}</pre></details>`);
}

main();
