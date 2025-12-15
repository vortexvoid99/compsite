// compsite-project/src/pages/Admin.tsx
import React, { useState, FormEvent } from 'react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

// Helper to format date to YYYY-MM-DDTHH:MM for datetime-local input
const toLocalDatetime = (date: Date): string => {
    const offset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(date.getTime() - offset)).toISOString().slice(0, 16);
    return localISOTime;
};

const Admin: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startAt, setStartAt] = useState(toLocalDatetime(new Date()));
    const [endAt, setEndAt] = useState(toLocalDatetime(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))); // 1 week from now
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [puzzleQuestion, setPuzzleQuestion] = useState('');
    const [puzzleAnswer, setPuzzleAnswer] = useState('');
    const [published, setPublished] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!title || !description || !startAt || !endAt || !imageFile) {
            toast.error('Please fill in all required fields and upload an image.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('start_at', new Date(startAt).toISOString());
        formData.append('end_at', new Date(endAt).toISOString());
        formData.append('published', published ? 'true' : 'false');
        formData.append('image_file', imageFile);

        if (puzzleQuestion && puzzleAnswer) {
            formData.append('puzzle_question', puzzleQuestion);
            formData.append('puzzle_answer', puzzleAnswer);
        }

        try {
            // The API endpoint is relative to the root, which will be handled by Cloudflare Pages Functions
            const response = await fetch('/api/admin/competitions', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(`Competition "${data.slug}" created successfully!`);
                // Optionally reset form fields here
            } else {
                const errorData = await response.json();
                toast.error(`Failed to create competition: ${errorData.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('An unexpected error occurred during submission.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Admin: Add New Competition</h1>
            <p className="mb-4 text-sm text-red-500">
                NOTE: This route is protected by Cloudflare Access. If you can see this page, you are authenticated.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                {/* Title */}
                <div>
                    <Label htmlFor="title">Title / Name</Label>
                    <Input 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>

                {/* Description */}
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                        id="description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <Label htmlFor="image_file">Image Upload (Required)</Label>
                    <Input 
                        id="image_file" 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} 
                        required 
                    />
                    {imageFile && <p className="text-xs text-gray-500 mt-1">Selected: {imageFile.name}</p>}
                </div>

                {/* Start & End Time */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="start_at">Start Time</Label>
                        <Input 
                            id="start_at" 
                            type="datetime-local" 
                            value={startAt} 
                            onChange={(e) => setStartAt(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <Label htmlFor="end_at">End Time (Countdown Timer)</Label>
                        <Input 
                            id="end_at" 
                            type="datetime-local" 
                            value={endAt} 
                            onChange={(e) => setEndAt(e.target.value)} 
                            required 
                        />
                    </div>
                </div>

                {/* Puzzle (Optional) */}
                <div className="border p-4 rounded-md space-y-4">
                    <h3 className="font-semibold">Optional Puzzle</h3>
                    <div>
                        <Label htmlFor="puzzle_question">Question</Label>
                        <Input 
                            id="puzzle_question" 
                            value={puzzleQuestion} 
                            onChange={(e) => setPuzzleQuestion(e.target.value)} 
                            placeholder="e.g., What is the capital of France?"
                        />
                    </div>
                    <div>
                        <Label htmlFor="puzzle_answer">Answer (Will be securely hashed)</Label>
                        <Input 
                            id="puzzle_answer" 
                            value={puzzleAnswer} 
                            onChange={(e) => setPuzzleAnswer(e.target.value)} 
                            placeholder="e.g., Paris"
                        />
                    </div>
                    {puzzleQuestion && !puzzleAnswer && (
                        <p className="text-sm text-yellow-600">Warning: Puzzle question is set, but answer is missing.</p>
                    )}
                </div>

                {/* Published Flag */}
                <div className="flex items-center space-x-2">
                    <input
                        id="published"
                        type="checkbox"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <Label htmlFor="published">Publish Competition Now</Label>
                </div>

                {/* Submit Button */}
                <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Create Competition'}
                </Button>
            </form>
        </div>
    );
};

export default Admin;
