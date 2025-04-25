import Papa from 'papaparse';

/**
 * 从CSV文件加载并解析商家数据
 * 
 * 使用PapaParse库将CSV转换为JSON对象
 * 
 * CSV应该采用以下格式：传真,电话,名称,联系人,描述,网址,网站,地址,标签,关键词
 * 
 * 如果CSV加载失败，则回退到模拟数据
 * 
 */

export const loadBusinessData = async () => {
    try {
        console.log("Attempting to fetch CSV file...");
        
         // 从公共目录获取CSV文件
        const response = await fetch(`${process.env.PUBLIC_URL}/fakeDataBase.csv`);
        console.log("Fetch response:", response.status, response.statusText);
        
        const csvData = await response.text();
        console.log("CSV data first 100 chars:", csvData.substring(0, 100));
        
        // 使用PapaParse解析CSV数据

        const results = Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true
        });
        
        console.log("Parsed results:", results);
        console.log("First item keys:", results.data[0] ? Object.keys(results.data[0]) : "No data");
    
        // 将CSV数据转换为我们的商家对象结构
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
      verified: Math.random() > 0.5 //demo用途随机！！！！！！注意，真实情况请删除！！！！！！
    }));
    
    return businesses;
  } catch (error) {
    console.error('Error loading business data:', error);
    // 如果CSV加载失败，返回planB
    return getFallbackBusinessData();
  }
};

// 下面是planB
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

// 根据搜索条件筛选商家（placeholder）
export const filterBusinesses = (businesses, filters = {}) => {
  return businesses;
};

// 通过ID获取单个商家（placeholder）
export const getBusinessById = (businesses, id) => {
  return businesses.find(business => business.id === parseInt(id));
};