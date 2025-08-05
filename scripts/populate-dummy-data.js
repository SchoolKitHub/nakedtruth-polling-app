const fetch = require('node-fetch');

// Realistic data for Nigeria's 2027 elections
const candidates = [
  'APC (All Progressives Congress)',
  'PDP (Peoples Democratic Party)', 
  'LP (Labour Party)',
  'NNPP (New Nigeria Peoples Party)',
  'ADC (African Democratic Congress)',
  'SDP (Social Democratic Party)',
  'YPP (Young Progressives Party)',
  'APGA (All Progressives Grand Alliance)'
];

const keyIssues = [
  'Economy & Job Creation',
  'Security & Safety', 
  'Corruption & Governance',
  'Healthcare System',
  'Education Reform',
  'Infrastructure Development',
  'Youth Empowerment',
  'Agriculture & Food Security',
  'Energy & Power Supply',
  'Electoral Reforms'
];

const ageGroups = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];

const regions = [
  'North Central',
  'North East', 
  'North West',
  'South East',
  'South South',
  'South West'
];

const genders = ['Male', 'Female', 'Prefer not to say'];

// Weighted distributions to make data more realistic
const candidateWeights = {
  'APC (All Progressives Congress)': 0.25,
  'PDP (Peoples Democratic Party)': 0.23,
  'LP (Labour Party)': 0.20,
  'NNPP (New Nigeria Peoples Party)': 0.15,
  'ADC (African Democratic Congress)': 0.07,
  'SDP (Social Democratic Party)': 0.04,
  'YPP (Young Progressives Party)': 0.03,
  'APGA (All Progressives Grand Alliance)': 0.03
};

const issueWeights = {
  'Economy & Job Creation': 0.25,
  'Security & Safety': 0.20,
  'Corruption & Governance': 0.15,
  'Healthcare System': 0.10,
  'Education Reform': 0.08,
  'Infrastructure Development': 0.07,
  'Youth Empowerment': 0.05,
  'Agriculture & Food Security': 0.04,
  'Energy & Power Supply': 0.04,
  'Electoral Reforms': 0.02
};

const ageWeights = {
  '18-24': 0.25,
  '25-34': 0.30,
  '35-44': 0.20,
  '45-54': 0.15,
  '55-64': 0.07,
  '65+': 0.03
};

const regionWeights = {
  'North West': 0.20,
  'South West': 0.18,
  'North Central': 0.15,
  'South East': 0.15,
  'South South': 0.16,
  'North East': 0.16
};

const genderWeights = {
  'Male': 0.52,
  'Female': 0.46,
  'Prefer not to say': 0.02
};

// Utility function to select weighted random item
function weightedRandom(items, weights) {
  const random = Math.random();
  let cumulative = 0;
  
  for (const [item, weight] of Object.entries(weights)) {
    cumulative += weight;
    if (random <= cumulative) {
      return item;
    }
  }
  
  return Object.keys(weights)[0]; // fallback
}

// Generate random IP addresses for diversity
function generateRandomIP() {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

// Generate a single poll response
function generatePollResponse() {
  const candidate = weightedRandom(candidates, candidateWeights);
  
  // Select 2-4 random issues with bias towards top priorities
  const numIssues = Math.floor(Math.random() * 3) + 2; // 2-4 issues
  const selectedIssues = [];
  
  while (selectedIssues.length < numIssues) {
    const issue = weightedRandom(keyIssues, issueWeights);
    if (!selectedIssues.includes(issue)) {
      selectedIssues.push(issue);
    }
  }
  
  const demographics = {
    age_group: weightedRandom(ageGroups, ageWeights),
    region: weightedRandom(regions, regionWeights),
    gender: weightedRandom(genders, genderWeights)
  };
  
  return {
    presidential_candidate: candidate,
    key_issues: selectedIssues,
    demographics: demographics,
    consent: true,
    _fake_ip: generateRandomIP() // For creating diverse IP hashes
  };
}

// Submit a poll response to the API
async function submitPollResponse(data) {
  try {
    const response = await fetch('http://localhost:3000/api/submit-poll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': data._fake_ip, // Simulate different IPs
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    return { success: response.ok, status: response.status, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Main function to populate database
async function populateDatabase() {
  console.log('🚀 Starting to populate database with 200 realistic poll responses...\n');
  
  let successful = 0;
  let failed = 0;
  const startTime = Date.now();
  
  for (let i = 1; i <= 200; i++) {
    const pollData = generatePollResponse();
    const result = await submitPollResponse(pollData);
    
    if (result.success) {
      successful++;
      if (i % 20 === 0) {
        console.log(`✅ Progress: ${i}/200 responses submitted successfully`);
      }
    } else {
      failed++;
      console.log(`❌ Failed submission ${i}: ${result.error || 'Unknown error'}`);
    }
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  
  console.log('\n🎉 Database population completed!');
  console.log(`📊 Results:`);
  console.log(`   ✅ Successful: ${successful}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   ⏱️  Duration: ${duration}s`);
  console.log(`   🚀 Average: ${(200 / duration).toFixed(1)} responses/second`);
  
  // Show final distribution summary
  console.log('\n📈 Expected Data Distribution:');
  console.log('🏛️  Top Candidates:');
  Object.entries(candidateWeights)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 4)
    .forEach(([candidate, weight]) => {
      console.log(`   • ${candidate}: ~${(weight * 100).toFixed(1)}%`);
    });
  
  console.log('\n🎯 Top Issues:');
  Object.entries(issueWeights)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .forEach(([issue, weight]) => {
      console.log(`   • ${issue}: ~${(weight * 100).toFixed(1)}%`);
    });
  
  console.log('\n🌍 Regional Distribution:');
  Object.entries(regionWeights)
    .sort(([,a], [,b]) => b - a)
    .forEach(([region, weight]) => {
      console.log(`   • ${region}: ~${(weight * 100).toFixed(1)}%`);
    });
  
  console.log('\n👥 Demographics:');
  console.log(`   • Youth (18-34): ~${((ageWeights['18-24'] + ageWeights['25-34']) * 100).toFixed(1)}%`);
  console.log(`   • Male/Female: ~${(genderWeights['Male'] * 100).toFixed(1)}% / ~${(genderWeights['Female'] * 100).toFixed(1)}%`);
  
  console.log('\n🎊 Your dashboard should now have rich, diverse polling data!');
  console.log('Visit http://localhost:3000/dashboard to see the results.');
}

// Error handling
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled promise rejection:', error);
  process.exit(1);
});

// Run the script
if (require.main === module) {
  populateDatabase().catch(console.error);
}

module.exports = { populateDatabase, generatePollResponse }; 