import React from 'react';
import Receipt from 'material-ui/svg-icons/action/receipt';
import {
  Loading,
  SnackBar,
  Input,
  Form,
} from '@delta/common-utils';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import Submit from '../../../components/Submit';
import Page from '../../../components/Page';
import ResultArea from '../../../components/ResultArea';
import Bread from '../../../components/Bread';
import { DisplayColumnTool } from '../../../components/Table/tools';
import { action, actionPost, actionPut, field, breadMap } from './config';
import {
  dataTemplate,
  dataSourceTemplate,
  dialogDataTemplate,
  onInitial,
  onSubmit,
  onSuccess,
  getRowProps,
  onCloseSnack,
  onSubmitModal,
  onSuccesModal,
  onErrorModal,
  onDelete,
  // shouldModalShowAdd,
  shouldModalShowUpdate,
} from './fn';
import './style.less';

const NAME = 'tools';
const getTitleBarTools = props => (
  [
    <DisplayColumnTool
      key="a"
      tableName={NAME}
      {...props}
      icon={<Receipt style={{ marginRight: 24 }} color="FFF" />}
    />,
  ]
);
class HumanHourSetting extends React.Component {
  constructor(props) {
    super(props);
    this.onInitial = onInitial(this);
    this.onSuccess = onSuccess(this);
    this.onSubmit = onSubmit(this);
    this.getRowProps = getRowProps(this);
    this.onCloseSnack = onCloseSnack(this);
    this.onSubmitModal = onSubmitModal(this);
    this.onSuccesModal = onSuccesModal(this);
    this.onErrorModal = onErrorModal(this);
    this.onDelete = onDelete(this);
    // this.shouldModalShowAdd = shouldModalShowAdd(this);
    this.shouldModalShowUpdate = shouldModalShowUpdate(this);
    this.state = {
      data: undefined,
      selected: undefined,
      method: undefined,
      loading: false,
      snackSwitch: false,
      message: undefined,
      productData: undefined,
      productId: undefined,
      workTimeA: undefined,
      workTimeB: undefined,
    };
  }
  componentWillMount() {
    this.onInitial();
  }
  render() {
    return (
      <Page>
        <Loading visible={this.state.loading} />
        <SnackBar
          open={this.state.snackSwitch}
          message={this.state.message}
          onClientRequestClose={this.onCloseSnack}
        />
        <Bread breadMap={breadMap} />
        <Form
          name="HumanHourSettingForm"
          action={action}
          method="GET"
          direction="column"
          dataTemplate={dataTemplate}
          dataSourceTemplate={dataSourceTemplate}
          onClientSubmit={this.onSubmit}
          onClientSuccess={this.onSuccess}
          collapse
        >
          <div className="row">
            <div className="col-4">
              <Input
                name="productId"
                floatingLabelText="机种"
                type="select"
                labelName="lineName"
                valueName="id"
                data={this.state.productData}
                value={this.state.productId}
              />
            </div>
            <div className="col-1">
              <div className="SearchButton">
                <Submit label="查询" />
              </div>
            </div>
            <div className="col-10" />
          </div>
        </Form>
        <div className="row">
          <div className="ModalButton">
            <Modal
              name="HumanHourSettingAddModal"
              title="新增人力工时"
              btnName="新增"
              // shouldModalShow={this.shouldModalShowAdd}
              formName="HumanHourSettingAddForm"
            >
              <Form
                name="HumanHourSettingAddForm"
                action={actionPost}
                method={this.state.method}
                dataTemplate={dialogDataTemplate}
                onClientSubmit={this.onSubmitModal}
                onClientSuccess={this.onSuccesModal}
                onClientError={this.onErrorModal}
                contentType="application/json"
              >
                <div className="row">
                  <div className="col-10">
                    <Input
                      name="productId"
                      floatingLabelText="机种"
                      type="select"
                      labelName="lineName"
                      valueName="id"
                      data={this.state.productData}
                      value={this.state.productId}
                    />
                  </div>
                  <div className="col-4" />
                  <div className="col-10">
                    <Input name="workTimeA" floatingLabelText="人力工时-A" fullWidth />
                  </div>
                  <div className="col-4" />
                  <div className="col-10">
                    <Input name="workTimeB" floatingLabelText="人力工时-B" fullWidth />
                  </div>
                </div>
              </Form>
            </Modal>
          </div>
          <div className="modalButton">
            <Button
              label="删除"
              onClientClick={this.onDelete}
            />
          </div>
          <div className="ModalButton">
            <Modal
              name="HumanHourSettingUpdateModal"
              title="修改人力工时"
              btnName="修改"
              shouldModalShow={this.shouldModalShowUpdate}
              formName="HumanHourSettingUpdateForm"
            >
              <Form
                name="HumanHourSettingUpdateForm"
                action={actionPut}
                method={this.state.method}
                dataTemplate={dialogDataTemplate}
                onClientSubmit={this.onSubmitModal}
                onClientSuccess={this.onSuccesModal}
                onClientError={this.onErrorModal}
                contentType="application/json"
              >
                <div className="row">
                  <div className="col-10">
                    <Input
                      name="productId"
                      floatingLabelText="机种"
                      type="select"
                      labelName="lineName"
                      valueName="id"
                      data={this.state.productData}
                      value={this.state.productId}
                    />
                  </div>
                  <div className="col-4" />
                  <div className="col-10">
                    <Input name="workTimeA" floatingLabelText="人力工时-A" value={this.state.workTimeA} fullWidth />
                  </div>
                  <div className="col-4" />
                  <div className="col-10">
                    <Input name="workTimeB" floatingLabelText="人力工时-B" value={this.state.workTimeB} fullWidth />
                  </div>
                </div>
              </Form>
            </Modal>
          </div>
        </div>
        <ResultArea>
          <Table
            name={NAME}
            title="查询结果"
            data={this.state.data}
            columns={field}
            getTrProps={this.getRowProps(this.state.selected)}
            getTitleBarTools={getTitleBarTools}
          />
        </ResultArea>
      </Page>
    );
  }
}

export default HumanHourSetting;
