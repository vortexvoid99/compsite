// compsite-project/src/types/competition.ts

export interface Competition {
    id: number;
    slug: string;
    title: string;
    description: string;
    image_reference: string;
    start_at: string; // ISO 8601 timestamp
    end_at: string;   // ISO 8601 timestamp
    puzzle_type: string | null;
    puzzle_question: string | null;
    published: 0 | 1;
    created_at: string;
    updated_at: string;
}
