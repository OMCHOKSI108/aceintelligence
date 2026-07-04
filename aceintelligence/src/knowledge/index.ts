import { Knowledge, DataSource } from '@botpress/runtime'

const faqSource = DataSource.Directory.fromPath('src/knowledge', {
  id: 'faq',
  filter: (filePath) => filePath.endsWith('.md') || filePath.endsWith('.pdf') || filePath.endsWith('.txt'),
})

export const FaqKB = new Knowledge({
  name: 'faqKB',
  description: 'FAQ documents for answering common questions about Ace Intelligence services',
  sources: [faqSource],
})
