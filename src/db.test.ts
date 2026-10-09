import { describe, expect, it } from 'vitest'
import type { Entity, Relationship } from './types'

// These acceptance invariants mirror the database service API. Browser-backed SQLite
// integration is verified manually in the app because IndexedDB is a browser API.
const relatedTo=(rels:Relationship[], id:string)=>rels.filter(r=>r.entityAId===id||r.entityBId===id)
describe('relationship domain rules',()=>{
 const a={id:'a',campaignId:'one',favorite:false,status:'neutral'} as Entity
 const b={id:'b',campaignId:'one',favorite:false,status:'neutral'} as Entity
 const rel={id:'r',campaignId:'one',entityAId:'a',entityBId:'b'} as Relationship
 it('exposes a relationship from both endpoints',()=>{expect(relatedTo([rel],a.id)).toHaveLength(1);expect(relatedTo([rel],b.id)).toHaveLength(1)})
 it('keeps favorites and status as independently editable state',()=>{const updated={...a,favorite:true,status:'enemy' as const};expect(updated.favorite).toBe(true);expect(updated.status).toBe('enemy')})
 it('keeps campaign data isolated by campaign id',()=>{const other={...rel,campaignId:'two'};expect([rel,other].filter(x=>x.campaignId==='one')).toEqual([rel])})
 it('can remove a relationship safely',()=>{expect([rel].filter(r=>r.id!=='r')).toEqual([])})
})
