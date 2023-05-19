import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Pagination, Row, Space, Table } from 'antd';
import { SetStateAction, useEffect, useState } from 'react';
import { useRequest } from 'umi';
import styles from './index.less';
const index = () => {
  const [page, setPage] = useState(1);
  const [per_page, setPerpage] = useState(10);
  const init = useRequest<{ data: BasicListApi.Data }>(
    `https://public-api-v2.aspirantzhang.com/api/admins?X-API-KEY=antd&page=${page}&per_page=${per_page}`,
  );

  const transformedDataSource = init.data?.dataSource.map((item) => ({
    ...item,
    key: item?.id,
  }));

  useEffect(() => {
    init.run();
  }, [page, per_page]);

  console.log(init);
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const searchLayout = () => {
    return null;
  };

  const beforeTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ....
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolBar}>
          <Space>
            <Button type="primary">Add</Button>
            <Button type="primary">Add2</Button>
          </Space>
        </Col>
      </Row>
    );
  };
  const paginationChangeHandler = (
    _page: SetStateAction<number>,
    _per_page: SetStateAction<number>,
  ) => {
    console.log(_page, _per_page);
    setPage(_page);
    setPerpage(_per_page);
    init.run();
  };

  const afterTableLayout = () => {
    return (
      <Row>
        <Col xs={24} sm={12}>
          ....
        </Col>
        <Col xs={24} sm={12} className={styles.tableToolBar}>
          <Pagination
            total={init?.data?.meta?.total || 0}
            current={init?.data?.meta?.page || 1}
            pageSize={init?.data?.meta?.per_page || 10}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
            onChange={paginationChangeHandler}
            onShowSizeChange={paginationChangeHandler}
          />
        </Col>
      </Row>
    );
  };

  return (
    <PageContainer>
      {searchLayout()}
      <Card>
        {beforeTableLayout()}
        <Table
          dataSource={transformedDataSource}
          columns={init?.data?.layout?.tableColumn.filter((item) => item.hideInColumn !== true)}
          pagination={false}
          loading={init.loading}
        />
        {afterTableLayout()}
      </Card>
    </PageContainer>
  );
};

export default index;
