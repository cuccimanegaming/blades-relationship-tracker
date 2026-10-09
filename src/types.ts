export type EntityType = 'character' | 'faction'
export type Status = 'friendly' | 'neutral' | 'enemy'
export interface Campaign { id: string; name: string; createdAt: string; updatedAt: string }
export interface Entity { id: string; campaignId: string; type: EntityType; name: string; shortDescription: string; description: string; status: Status; favorite: boolean; affiliation: string; role: string; activity: string; createdAt: string; updatedAt: string; tags: string[] }
export interface Relationship { id: string; campaignId: string; entityAId: string; entityBId: string; type: string; shortDescription: string; notes: string; importance: number | null; createdAt: string; updatedAt: string }
export type EntityDraft = Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>
export type RelationshipDraft = Omit<Relationship, 'id' | 'createdAt' | 'updatedAt'>
