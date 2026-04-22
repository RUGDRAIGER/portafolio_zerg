import React, { useState, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MENU_ITEMS = [
  { id: 'nexo', label: 'NEXO CENTRAL', barImage: 'bar_overlay1.png' },
  { id: 'embrion', label: 'EMBRIÓN', barImage: 'bar_overlay2.png' },
  { id: 'larva', label: 'LARVA', barImage: 'bar_overlay3.png' },
  { id: 'crisalida', label: 'CRISÁLIDA', barImage: 'bar_overlay4.png' },
  { id: 'zangano', label: 'ZÁNGANO', barImage: 'bar_overlay5.png' },
  { id: 'hidraliscos', label: 'HIDRALISCO', barImage: 'bar_overlay6.png' },
  { id: 'reina', label: 'REINA', barImage: 'bar_overlay7.png' },
];

export default function BootstrapOverlayMenu({ activeId, onNavigate }) {
  const [hoverId, setHoverId] = useState(null);

  const handleClick = useCallback(
    (id) => {
      onNavigate?.(id);
    },
    [onNavigate]
  );

  return (
    <div className="bootstrap-overlay-menu">
      <Container fluid className="p-0">
        <Row className="g-0">
          {MENU_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            const isHovered = hoverId === item.id;

            return (
              <Col 
                key={item.id} 
                xs={12} 
                className="menu-item-col"
              >
                <button
                  type="button"
                  className={`menu-item-stack ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
                  onClick={() => handleClick(item.id)}
                  onMouseEnter={() => setHoverId(item.id)}
                  onMouseLeave={() => setHoverId(null)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Capa 1: bar_overlay{N}.png (única para cada item) */}
                  <div className="layer layer-bar-overlay">
                    <img
                      src={`/img/overlay/${item.barImage}`}
                      alt=""
                      className="img-fluid"
                    />
                  </div>

                  {/* Capa 2: Texto (título) */}
                  <div className="layer layer-text">
                    <span className="menu-text">{item.label}</span>
                  </div>
                </button>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
