import React from 'react'

interface ColorKeyItem {
  color: string
  text: string
}

const colorKeyItems: ColorKeyItem[] = [
  { color: '#FDB813', text: 'Sun' },
  { color: '#7F7F7F', text: 'Mercury' },
  { color: '#E3C8A0', text: 'Venus' },
  { color: '#2E8BC0', text: 'Earth' },
  { color: '#C1440E', text: 'Mars' },
  { color: '#D89C63', text: 'Jupiter' },
  { color: '#D9C88D', text: 'Saturn' },
  { color: '#A0D8E6', text: 'Uranus' },
  { color: '#4B6BBE', text: 'Neptune' },
  { color: '#FF0000', text: 'Hazardous NEO' },
  { color: '#00FF00', text: 'Non-hazardous NEO' },
]

export function ColorKey() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '10px',
        borderRadius: '5px',
        color: 'white',
        fontSize: '12px',
      }}
    >
      <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Color Key</h2>
      <table>
        <tbody>
          {colorKeyItems.map((item, index) => (
            <tr key={index}>
              <td style={{ paddingRight: '10px' }}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: item.color,
                    display: 'inline-block',
                  }}
                ></div>
              </td>
              <td>{item.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}