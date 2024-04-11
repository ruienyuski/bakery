import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";
import * as XLSX from "xlsx";
import { Modal } from "bootstrap";
import ProductModal from "../../components/ProductModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

export default function AdminProducts() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState("create");
  const [tempProduct, setTempProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [excelData, setExcelData] = useState([]);

  const ItemModal = useRef(null);
  const deleteItemModal = useRef(null);
  const fileInput = useRef(null);

  useEffect(() => {
    ItemModal.current = new Modal("#OpenProductModal", {
      backdrop: "static",
    });
    deleteItemModal.current = new Modal("#DeleteModal", {
      backdrop: "static",
    });
    setIsLoading(true);
    getData();
  }, [excelData]);

  const openModal = (type, item) => {
    setType(type);
    setTempProduct(item);
    ItemModal.current.show();
  };
  const closeModal = () => {
    ItemModal.current.hide();
  };

  const openDeleteModal = (data) => {
    setTempProduct(data);
    deleteItemModal.current.show();
  };
  const closeDeleteModal = () => {
    deleteItemModal.current.hide();
  };
  const deleteProduct = async (id) => {
    const res = await axios.delete(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`
    );
    if (res.data.success) {
      setIsLoading(true);
      getData();
      closeDeleteModal();
    }
  };

  const getData = async (page = 1) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`
    );
    setProducts(res.data.products);
    setPagination(res.data.pagination);
    setIsLoading(false);
  };

  const handleFileChange = (event) => {
    const fileValue = event.target.files[0];
    if (fileInput) {
      readFile(fileValue);
    }
  };

  const readFile = (fileValue) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const temp = XLSX.utils.sheet_to_json(sheet);
      const repeat = [];
      temp.forEach((newProduct) => {
        const existingProduct = products.find(
          (oldProduct) => oldProduct.title === newProduct.title
        );
        if (!existingProduct) {
          newProduct.id = "";
          newProduct.is_enabled = 0;
          setExcelData((pre) => [...pre, newProduct]);
        } else {
          repeat.push(newProduct);
        }
      });
      if (repeat.length > 0) {
        setExcelData([]);
        fileInput.current.value = null;
        dispatch(
          createAsyncMessage({
            message: "錯誤訊息: 上傳的 excel 內有重複資料",
            success: false,
          })
        );
      }
      getData();
    };
    reader.readAsArrayBuffer(fileValue);
  };

  const uploadData = () => {
    if (excelData.length > 0) {
      const api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`;
      for (const row of excelData) {
        const formattedData = { data: row };
        axios.post(api, formattedData).then(() => {
          getData();
        });
      }
    } else {
      dispatch(
        createAsyncMessage({
          message: "錯誤訊息: 請重新上傳 excel",
          success: false,
        })
      );
    }
    setExcelData([]);
    fileInput.current.value = null;
  };

  const downloadData = () => {
    const api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products/all`;
    axios.get(api).then((res) => {
      const data = Object.keys(res.data.products).map(
        (i) => res.data.products[i]
      );
      //  data to worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);

      // Create a workbook and add the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      // Export the workbook to Excel file
      XLSX.writeFile(workbook, "products.xlsx");
    });
  };
  return (
    <>
      <div className="p-3">
        <Loading isLoading={isLoading} />
        <ProductModal
          closeModal={closeModal}
          getImportData={getData}
          tempItem={tempProduct}
          type={type}
        />
        <DeleteModal
          close={closeDeleteModal}
          text={tempProduct.title}
          handlDelete={deleteProduct}
          id={tempProduct.id}
        />
        {products.length === 0 ? (
          <div className="text-danger">沒有產品</div>
        ) : (
          <>
            <h3>產品列表</h3>
            <hr />
            <div className="row justify-content-between">
              <div className="col-9">
                <div className="row">
                  <div className="col-4">
                    <input
                      type="file"
                      className="my-3 form-control "
                      ref={fileInput}
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="col">
                    <button
                      type="button"
                      className="my-3 btn btn-light"
                      onClick={uploadData}
                    >
                      上傳Excel文件(*.xlsx)
                    </button>
                    <button
                      type="button"
                      className="my-3 btn btn-light"
                      onClick={downloadData}
                    >
                      下載Excel文件
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm my-3"
                    onClick={() => openModal("create", {})}
                  >
                    建立新商品
                  </button>
                </div>
              </div>
            </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">分類</th>
                    <th scope="col">名稱</th>
                    <th scope="col">售價</th>
                    <th scope="col">啟用狀態</th>
                    <th scope="col">編輯</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((el, key) => {
                    return (
                      <tr key={el.id}>
                        <th scope="row">{key + 1}</th>
                        <td>{el.category}</td>
                        <td>{el.title}</td>
                        <td>{el.price}</td>
                        <td>{el.is_enabled ? "啟用" : "未啟用"}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => openModal("edit", el)}
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm ms-2"
                            onClick={() => openDeleteModal(el)}
                          >
                            刪除
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination pagination={pagination} getImportData={getData} />
          </>
        )}
      </div>
    </>
  );
}
