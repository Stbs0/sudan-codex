import fs from 'fs';
import path from 'path';

function slugify(text) {
  if (typeof text !== 'string') {
    return '';
  }
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

const inputPath = path.join(process.cwd(), 'public/data/drugData.json');
const outputPath = path.join(process.cwd(), 'public/data/drugDataWithSlugs.json');

fs.readFile(inputPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    const drugs = JSON.parse(data);

    const slugifiedDrugs = drugs.map(drug => ({
      ...drug,
      genericNameSlug: slugify(drug.genericName),
      companyNameSlug: slugify(drug.companyName),
      agentNameSlug: slugify(drug.agentName),
      countryOfOriginSlug: slugify(drug.countryOfOrigin),
    }));

    fs.writeFile(outputPath, JSON.stringify(slugifiedDrugs, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing the file:', writeErr);
        return;
      }
      console.log('Successfully created slugified drug data at', outputPath);
    });
  } catch (parseErr) {
    console.error('Error parsing JSON string:', parseErr);
  }
});
