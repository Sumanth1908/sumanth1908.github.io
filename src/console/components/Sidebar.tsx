import { useState } from 'react';
import styled from '@emotion/styled';
import { LayoutGrid, Server, Rocket, Activity, Bell, FileCode2, Radio, Sparkles, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { fonts, palette } from '../palette';
import { navItems } from '../types';
import type { ViewId } from '../types';

const icons: Record<ViewId, React.ComponentType<{ size?: number }>> = {
  overview: LayoutGrid,
  services: Server,
  deployments: Rocket,
  metrics: Activity,
  alerts: Bell,
  config: FileCode2,
};

const STORAGE_KEY = 'console-sidebar-collapsed';

const Wrap = styled.nav<{ $collapsed: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? '60px' : '208px')};
  flex: 0 0 ${({ $collapsed }) => ($collapsed ? '60px' : '208px')};
  background: ${palette.bgElevated};
  border-right: 1px solid ${palette.border};
  display: flex;
  flex-direction: column;
  padding: 14px 10px;
  gap: 2px;
  transition: width 0.18s ease, flex-basis 0.18s ease;

  @media (max-width: 860px) {
    width: 100%;
    flex: none;
    flex-direction: row;
    overflow-x: auto;
    border-right: none;
    border-bottom: 1px solid ${palette.border};
    padding: 8px;
  }
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 4px 16px 6px;

  @media (max-width: 860px) {
    display: none;
  }
`;

const BrandText = styled.span`
  font-family: ${fonts.mono};
  font-size: 0.8rem;
  color: ${palette.text};
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
`;

const ToggleBtn = styled.button`
  background: none;
  border: none;
  color: ${palette.textDim};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;

  &:hover {
    color: ${palette.text};
    background: ${palette.panel};
  }
`;

const Item = styled.button<{ $active: boolean; $collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  gap: 10px;
  padding: 9px 12px;
  border-radius: 4px;
  border: none;
  background: ${({ $active }) => ($active ? palette.panel : 'transparent')};
  color: ${({ $active }) => ($active ? palette.text : palette.textMuted)};
  border-left: 2px solid ${({ $active }) => ($active ? palette.blue : 'transparent')};
  font-family: ${fonts.sans};
  font-size: 0.86rem;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  flex: 0 0 auto;

  &:hover {
    background: ${palette.panel};
    color: ${palette.text};
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${palette.border};
  margin: 10px 4px;

  @media (max-width: 860px) {
    display: none;
  }
`;

const Footer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (max-width: 860px) {
    display: none;
  }
`;

const FooterLink = styled.a<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  color: ${palette.textDim};
  text-decoration: none;
  font-family: ${fonts.mono};
  font-size: 0.72rem;
  white-space: nowrap;

  &:hover {
    color: ${palette.textMuted};
    background: ${palette.panel};
  }
`;

interface Props {
  active: ViewId;
  onSelect: (id: ViewId) => void;
}

const Sidebar = ({ active, onSelect }: Props) => {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });

  const toggle = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
      } catch {
        // ignore persistence failures (private browsing, etc.)
      }
      return next;
    });
  };

  return (
    <Wrap $collapsed={collapsed}>
      <BrandRow>
        <Sparkles size={16} color={palette.blue} />
        {!collapsed && <BrandText>sumanth-prod</BrandText>}
        <ToggleBtn type="button" onClick={toggle} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? <ChevronsRight size={15} /> : <ChevronsLeft size={15} />}
        </ToggleBtn>
      </BrandRow>
      {navItems.map((item) => {
        const Icon = icons[item.id];
        return (
          <Item
            key={item.id}
            type="button"
            title={item.label}
            $active={active === item.id}
            $collapsed={collapsed}
            onClick={() => onSelect(item.id)}
          >
            <Icon size={16} />
            {!collapsed && item.label}
          </Item>
        );
      })}
      <Divider />
      <Footer>
        <FooterLink href="/radio" title="v2 — radio" $collapsed={collapsed}>
          <Radio size={13} /> {!collapsed && 'v2 — radio'}
        </FooterLink>
        <FooterLink href="/legacy" title="v1 — legacy" $collapsed={collapsed}>
          <Sparkles size={13} /> {!collapsed && 'v1 — legacy'}
        </FooterLink>
      </Footer>
    </Wrap>
  );
};

export default Sidebar;
