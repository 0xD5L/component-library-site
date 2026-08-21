export type CollectionId = 'library' | 'motion' | 'fintech'

export type ComponentEntry = {
  name: string
  slug: string
  description: string
  category: string
  status: 'stable' | 'beta' | 'new'
  collection: CollectionId
  accent: 'cyan' | 'purple' | 'green'
}

export const collections = [
  { id: 'library' as const, label: 'Personal Library', count: 12, description: 'Reusable foundations for expressive interfaces.', accent: 'cyan' },
  { id: 'motion' as const, label: 'Motion Primitives', count: 8, description: 'Small moments that make interfaces feel alive.', accent: 'purple' },
  { id: 'fintech' as const, label: 'Nigerian Fintech UI Kit', count: 6, description: 'Trust-first patterns for money in motion.', accent: 'green' },
]

export const components: ComponentEntry[] = [
  { name: 'Button', slug: 'button', description: 'Actions with clear hierarchy and tactile feedback.', category: 'Buttons', status: 'stable', collection: 'library', accent: 'cyan' },
  { name: 'Card', slug: 'card', description: 'A quiet surface for grouped content.', category: 'Cards', status: 'stable', collection: 'library', accent: 'cyan' },
  { name: 'Modal', slug: 'modal', description: 'Focused interruptions without losing context.', category: 'Overlays', status: 'stable', collection: 'library', accent: 'cyan' },
  { name: 'Toast', slug: 'toast', description: 'Transient feedback that stays out of the way.', category: 'Overlays', status: 'new', collection: 'library', accent: 'cyan' },
  { name: 'Input', slug: 'input', description: 'A considered starting point for every form.', category: 'Forms', status: 'stable', collection: 'library', accent: 'cyan' },
  { name: 'Skeleton Loader', slug: 'skeleton-loader', description: 'Loading states that preserve layout rhythm.', category: 'Feedback', status: 'stable', collection: 'library', accent: 'cyan' },
  { name: 'Page Transition', slug: 'page-transition', description: 'Soft continuity between routes.', category: 'Transitions', status: 'beta', collection: 'motion', accent: 'purple' },
  { name: 'Tilt Card', slug: 'tilt-card', description: 'A subtle physical response to cursor movement.', category: 'Interactive', status: 'new', collection: 'motion', accent: 'purple' },
  { name: 'Marquee', slug: 'marquee', description: 'Continuous movement for logos, words, and signals.', category: 'Content', status: 'stable', collection: 'motion', accent: 'purple' },
  { name: 'OTP Input', slug: 'otp-input', description: 'A calm, legible verification moment.', category: 'Verification', status: 'stable', collection: 'fintech', accent: 'green' },
  { name: 'Naira Input', slug: 'naira-input', description: 'Currency entry built for clarity and confidence.', category: 'Money', status: 'new', collection: 'fintech', accent: 'green' },
  { name: 'Transaction Status', slug: 'transaction-status', description: 'States that make the next step obvious.', category: 'Transactions', status: 'stable', collection: 'fintech', accent: 'green' },
]

export const featured = components.slice(0, 3)

export function getCollection(id: CollectionId) {
  return collections.find((collection) => collection.id === id) ?? collections[0]
}

export function getComponents(collection: CollectionId) {
  return components.filter((component) => component.collection === collection)
}

export function getComponent(slug: string) {
  return components.find((component) => component.slug === slug)
}

export const codeSnippets: Record<string, string> = {
  button: `<Button variant="primary">Ship it</Button>`,
  card: `<Card>\n  <CardHeader>\n    <CardTitle>Account balance</CardTitle>\n  </CardHeader>\n</Card>`,
  modal: `<Dialog open={open} onOpenChange={setOpen}>\n  <DialogContent>\n    Confirm transfer\n  </DialogContent>\n</Dialog>`,
}

export const categories = ['Buttons', 'Cards', 'Overlays', 'Forms', 'Feedback', 'Transitions', 'Interactive', 'Content', 'Verification', 'Money', 'Transactions']
