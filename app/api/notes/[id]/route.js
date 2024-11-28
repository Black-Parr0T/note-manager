import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
    try {
        const client = await clientPromise;
        const db = client.db('myFirstDatabase');

        const { id } = await params;
        if (!id || !ObjectId.isValid(id)) {
            return new Response(JSON.stringify({ error: 'Invalid note ID' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const noteId = new ObjectId(id);
        const note = await db.collection('notes').findOne({ _id: noteId });

        if (!note) {
            return new Response(JSON.stringify({ error: 'Note not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        return new Response(JSON.stringify(note), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Failed to fetch note:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch note' }), {
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
        return new Response(JSON.stringify(result.ops[0]), {
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

export async function PUT(request,{ params }) {
    try {
        const client = await clientPromise;
        const db = client.db('myFirstDatabase');

        const data = await request.json();
        const { id } = await params;
        const timestamp = new Date();
        if (!id || !ObjectId.isValid(id)) {
            return new Response(JSON.stringify({ error: 'Invalid note ID' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const noteId = new ObjectId(id);
        const note = {
            ...data,
            updatedAt: timestamp,
        };
        delete note._id;

        const result = await db.collection('notes').updateOne({ _id: noteId }, { $set: note });

        if (result.matchedCount === 0) {
            return new Response(JSON.stringify({ error: 'Note not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Failed to update note:', error);
        return new Response(JSON.stringify({ error: 'Failed to update note' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function DELETE(request,{params}) {
    try {
        const client = await clientPromise;
        const db = client.db('myFirstDatabase');
        const { id } = await params;
        if (!id || !ObjectId.isValid(id)) {
            return new Response(JSON.stringify({ error: 'Invalid note ID' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const noteId = new ObjectId(id);
        const result = await db.collection('notes').deleteOne({ _id: noteId });

        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({ error: 'Note not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Failed to delete note:', error);
        return new Response(JSON.stringify({ error: 'Failed to delete note' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}