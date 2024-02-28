import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient } from 'graphql-request';
import { htmlToSlateAST } from '@graphcms/html-to-slate-ast';

const GET_IMAGE = `${process.env.API_URL}/api/get-image`;
const IMAGE_UPLOAD_API_URL = `${process.env.API_URL}/api/image-upload`;
const GPT_API_URL = `${process.env.API_URL}/api/gpt`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const hygraph = new GraphQLClient(process.env.HYGRAPH_ENDPOINT || "", {
        headers: {
            Authorization: `Bearer ${process.env.HYGRAPH_ASSET_TOKEN}`,
        },
    });


    let { title } = req.body;
    if (!title) {
        title = 'How to create a blog post using GPT-3';
    }
    const slug = generateShortSlug(title, 20);

    // try {

    // Step 0: Get Image URL
    const imageResponse = await axios.post(GET_IMAGE, { query: title })
    // Update progress for Step 0
    updateProgress('Step 0: Get Image URL completed');

    // Step 1: Upload the image
    const imageUploadResponse = await axios.post(IMAGE_UPLOAD_API_URL, { imageURL: imageResponse.data.urls.full });
    const imageID = imageUploadResponse.data.imageID;

    // Publish image to HyGraph using mutation
    const PublishAsset = await hygraph.request(
        `mutation PublishAsset($id: ID!) {
            publishAsset(where: { id: $id }) {
                id
                height
                width
            }
        }`,
        {
            id: imageID,
            height: 630,
            width: 1200,
        }
    )



    // Update progress for Step 1
    updateProgress('Step 1: Upload the image completed');

    // Step 2: Generate the blog post content
    const gptResponse = await axios.post(GPT_API_URL, { question: title });

    const generatedContent = gptResponse.data.answer.choices[0].message.content;

        // Split the content into HTML and Excerpt
    const parts = generatedContent.split('Excerpt:');

    // Extract the HTML content and the excerpt
    const htmlContent = parts[0].trim();
    const excerpt = parts.length > 1 ? parts[1].trim() : '';

    console.log('HTML Content:', htmlContent);
    console.log('Excerpt:', excerpt);

    const ast = await htmlToSlateAST(htmlContent);
    const content = {
        children: ast,
        };

    // Update progress for Step 2
    updateProgress('Step 2: Generate the blog post content completed');
    // const generatedContent = gptResponse.data.content;



    //HyGraph mutation to post blog post
    // Step 3: Post the blog post


    const publishBlogPost = await hygraph.request(
        `mutation CreateBlogPost($title: String!, $content: RichTextAST!, $slug: String!, $imageID: ID!, $excerpt: String!) {
            createBlogPost(
                data: {
                    title: $title,
                    slug: $slug,
                    category: GUIDE,
                    coverImage: { connect: { id: $imageID } },
                    content: $content
                    excerpt: $excerpt
                }
            ) {
                id
            }
        }`,
        {
            title,
            content: content,
            slug,
            imageID,
            excerpt
        }
    )

    // after mutation, publish the post HyGraph
    const publishBlogPostResponse = await hygraph.request(
        `mutation PublishBlogPost($id: ID!) {
            publishBlogPost(where: { id: $id }) {
                id
            }
        }`,
        {
            id: (publishBlogPost as any).createBlogPost.id,
        }
    )

    // Update progress for Step 3
    updateProgress('Step 3: Post the blog post completed');
    res.status(200).json({ message: 'Blog post successfully posted', content: generatedContent });
}


function updateProgress(message) {
    console.log(message);
}

function generateShortSlug(title, maxLength) {
    let slug = title.replace(/[^\w\s]/g, '').toLowerCase();
    slug = slug.replace(/\s+/g, '-');
    return slug;
}