import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}> 
    <Menu.Item key="mail">
      <a href="/writing">게시글</a>
    </Menu.Item>
    <Menu.Item>
      <a href="/">공고 보기</a>
    </Menu.Item>
      <SubMenu title={<span>메뉴</span>}>
        <Menu.Item key="setting:1">
          <a href="https://haeburney.github.io/MyPetTest/" target='_blank'>반려동물 테스트</a>
        </Menu.Item>
        <Menu.Item key="setting:2">
          <a href="https://haeburney.github.io/tensorflow_test/" target='_black'>사진으로 검색</a>
        </Menu.Item>
        {/* <MenuItemGroup title="Item 1">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup> */}
      </SubMenu>
  </Menu>
  )
}

export default LeftMenu