import clientPromise from '../../../lib/mongodb';

export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db('myFirstDatabase');
        await db.command({ ping: 1 });
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const pageSize = 6;
        const skip = (page - 1) * pageSize;
        const notes = await db
            .collection('notes')
            .find({})
            .sort({ pinned: -1, createdAt: -1 })
            .skip(skip)
            .limit(pageSize + 1)
            .toArray();
        const hasMore = notes.length > pageSize;
        return new Response(JSON.stringify({
            notes: notes.slice(0, pageSize),
            hasMore,
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Failed to fetch notes:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch notes' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}


export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db('myFirstDatabase');

        const data = await request.json();
        const timestamp = new Date();
        const note = {
            ...data,
            createdAt: timestamp,
            updatedAt: timestamp,
        };

        const result = await db.collection('notes').insertOne(note);
        return new Response(JSON.stringify(result), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Failed to create note:', error);
        return new Response(JSON.stringify({ error: 'Failed to create note' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}