export function parseAdvancedSearch(query: string) {
  const filter: any = { $and: [] };
  const orTerms: any[] = [];
  
  // Basic regex for extracting tokens (quotes, negative sign, key:value, basic words)
  // This is a simplified regex for demo purposes
  const tokens = query.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
  
  let currentLogic = 'AND';

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    
    // Handle explicit logic operators
    if (token === 'AND') {
      currentLogic = 'AND';
      continue;
    } else if (token === 'OR') {
      currentLogic = 'OR';
      continue;
    } else if (token === 'NOT') {
      currentLogic = 'NOT';
      continue;
    }

    let isNegative = currentLogic === 'NOT';
    if (token.startsWith('-')) {
      isNegative = true;
      token = token.substring(1);
    }
    
    // Reset logic operator to default after processing
    if (currentLogic === 'NOT') currentLogic = 'AND';

    // Parse key:value (e.g. tag:cardiology, symptom:syncope)
    const colonIndex = token.indexOf(':');
    if (colonIndex > 0) {
      const key = token.substring(0, colonIndex).toLowerCase();
      const value = token.substring(colonIndex + 1).replace(/"/g, '');
      
      let condition: any = {};
      
      if (key === 'tag' || key === 'tags') {
        condition = { tags: { $regex: value, $options: 'i' } };
      } else if (key === 'symptom') {
        condition = { symptoms: { $regex: value, $options: 'i' } };
      } else if (key === 'specialty' || key === 'specialization') {
        condition = { specialization: { $regex: value, $options: 'i' } };
      } else {
        // Fallback for unknown key
        condition = { [key]: { $regex: value, $options: 'i' } };
      }

      if (isNegative) {
        filter.$and.push({ $nor: [condition] });
      } else if (currentLogic === 'OR') {
        orTerms.push(condition);
      } else {
        filter.$and.push(condition);
      }
    } else {
      // Standard text search across title and description
      const cleanToken = token.replace(/"/g, '');
      const condition = {
        $or: [
          { title: { $regex: cleanToken, $options: 'i' } },
          { description: { $regex: cleanToken, $options: 'i' } },
          { tags: { $in: [new RegExp(cleanToken, 'i')] } }
        ]
      };

      if (isNegative) {
        filter.$and.push({ $nor: [condition] });
      } else if (currentLogic === 'OR') {
        orTerms.push(condition);
      } else {
        filter.$and.push(condition);
      }
    }
  }

  // Combine OR terms if they exist
  if (orTerms.length > 0) {
    if (filter.$and.length === 0) {
      filter.$or = orTerms;
      delete filter.$and;
    } else {
      filter.$and.push({ $or: orTerms });
    }
  }

  // Cleanup empty $and
  if (filter.$and && filter.$and.length === 0) {
    delete filter.$and;
  }

  return filter;
}
