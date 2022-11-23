
import 'antd/dist/antd.min.css';
import { Button, Table, Modal, Input } from "antd";
import { useState,useEffect } from "react";
import { EditOutlined, DeleteOutlined} from "@ant-design/icons";
import axios from 'axios';

function Hasta() {
  const [data, setData] = useState([]);
  useEffect(()=>{
    getall()},[])
    
  const getall = () => {
    axios.get(
      `http://localhost:8080/hasta`
    ).then((result)=>{
      console.log("axios data",result.data)
      setData(result.data)
    }).catch((error)=>{
      console.log("error",error)
    })
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "hasta_id",
    },
    {
      key: "2",
      title: "Adı",
      dataIndex: "adi",
    },
    {
      key: "3",
      title: "Soyadı",
      dataIndex: "soyadi",
    },
    {
      key: "4",
      title: "Hastalık",
      dataIndex: "hastalik",
    },
    {
      key: "5",
      title: "İşlemler",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];
  const messagebilgi=(title)=>{
    Modal.info({title,type:'success'});
  }
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Bu Hastayı Silmek İstediğinden Emin Misin?",
      okText: "Evet",
      okType: "danger",
      onOk: () => {
        axios.get('/hasta/'+record.hasta_id)
        .then(function (response) {
          messagebilgi('Hasta Silindi');
          getall();
        })
        .catch(function (error) {
          console.log(error);
        });
      },
    });
  };
  const onEditStudent = (record) => {
    // update 
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    
    setIsEditing(false);
    setEditingStudent(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={() => {
                onEditStudent();
              }}>Yeni Bir Hasta Ekle</Button>
        <Table columns={columns} dataSource={data}></Table>
        
        <Modal
          title="Hasta Ekleme Ve Güncelleme"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            axios.post(editingStudent.hasta_id?'/hasta/update':'/hasta', {
              hasta_id:editingStudent.hasta_id,
              adi:editingStudent.adi,
              soyadi:editingStudent.soyadi,
              hastalik: editingStudent.hastalik
            })
            .then(function (response) {
          messagebilgi(editingStudent.hasta_id?editingStudent.adi+ ' Adlı Hasta Güncellendi.':editingStudent.adi+ ' Adlı Hasta Eklendi.');
              getall();
            })
            .catch(function (error) {
              console.log(error);
            });
            resetEditing();
          }}
        >
        
          <Input 
            
            value={editingStudent?.adi}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, adi: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.soyadi}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, soyadi: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.hastalik}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, hastalik: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default Hasta;