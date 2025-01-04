const { default: axios } = require("axios");
const { useState, useEffect } = require("react");

function useFetchData(apiEndpoint) {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true); // بدء حالة التحميل
        const res = await axios.get(apiEndpoint);
        setAllData(res.data); // تعيين البيانات المسترجعة
      } catch (error) {
        console.error("Error fetching data:", error.message); // عرض رسالة الخطأ
      } finally {
        setLoading(false); // إنهاء حالة التحميل
      }
    };

    if (apiEndpoint) {
      fetchAllData();
    }
  }, [apiEndpoint]);

  return { allData, loading }; // إرجاع البيانات وحالة التحميل ككائن
}

export default useFetchData;
