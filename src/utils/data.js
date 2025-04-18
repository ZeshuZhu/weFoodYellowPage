import Papa from 'papaparse';

// Function to load and parse the CSV data
export const loadBusinessData = async () => {
    try {
        console.log("Attempting to fetch CSV file...");
        
        const response = await fetch(`${process.env.PUBLIC_URL}/fakeDataBase.csv`);
        console.log("Fetch response:", response.status, response.statusText);
        
        const csvData = await response.text();
        console.log("CSV data first 100 chars:", csvData.substring(0, 100));
        
        const results = Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true
        });
        
        console.log("Parsed results:", results);
        console.log("First item keys:", results.data[0] ? Object.keys(results.data[0]) : "No data");
    
    // Transform the data to match our expected business structure
    const businesses = results.data.map((item, index) => ({
      id: index + 1, // Generate an ID for each business
      name: item.name || 'Unknown Business',
      contact: item.contact || '',
      description: item.description || '',
      phone: item.phone || '',
      fax: item.fax || '',
      website: item.website || item.url || '',
      addresses: item.addresses || '',
      tags: item.tags || item.keyword || '',
      verified: Math.random() > 0.5 // Randomly assign verification status for demo
    }));
    
    return businesses;
  } catch (error) {
    console.error('Error loading business data:', error);
    // Return fallback data if CSV loading fails
    return getFallbackBusinessData();
  }
};

// Fallback data in case CSV loading fails
const getFallbackBusinessData = () => {
  return [
    {
      id: 1,
      name: '鲜食供应有限公司',
      description: '专业供应各类新鲜蔬菜和海鲜，为餐饮行业提供一站式食材解决方案。',
      contact: '张经理',
      phone: '123-456-7890',
      fax: '123-456-7891',
      website: 'https://example.com',
      addresses: '纽约市皇后区',
      tags: '供应商,食材,蔬菜,海鲜',
      verified: true
    },
    {
      id: 2,
      name: '餐厅装修设计工作室',
      description: '专注于餐厅空间设计与装修，提供从概念设计到施工的全流程服务。',
      contact: '李设计师',
      phone: '234-567-8901',
      fax: '234-567-8902',
      website: 'https://design-example.com',
      addresses: '洛杉矶市好莱坞区',
      tags: '装修,设计,施工',
      verified: false
    },
    {
      id: 3,
      name: '厨房设备批发中心',
      description: '各类专业厨房设备和餐具的批发供应商，提供安装和维修服务。',
      contact: '王经理',
      phone: '345-678-9012',
      fax: '345-678-9013',
      website: 'https://equipment-example.com',
      addresses: '芝加哥市中心区',
      tags: '设备,餐具,批发',
      verified: true
    }
  ];
};

// Function to filter businesses based on search criteria
export const filterBusinesses = (businesses, filters = {}) => {
  // Implementation details...
  return businesses;
};

// Function to get a single business by ID
export const getBusinessById = (businesses, id) => {
  return businesses.find(business => business.id === parseInt(id));
};