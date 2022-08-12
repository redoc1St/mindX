import React from 'react';
//Demo qua cho dễ hiểu về Hook
export default function Box({ constNumber = 1 }) {
    const [color, setColor] = React.useState('red');
    const [width, setWidth] = React.useState(100);
    const [height, setHeight] = React.useState(200);

    // const area = width * height;

    const area= React.useMemo(()=>{
        return width*height*constNumber
    },[width,height,constNumber])

    const doubleArea = React.useMemo(()=>{
        return area*2
    },[area])

    /////////////////////////////////////
    //với cả mấy giá trị bên trong object như này thì không so sánh được, vì nó undifine,nên là lúc nào cũng gọi hàm useEffect như dưới
    // const area = { value: width * height }
    // React.useEffect(() => {
    //     console.log("hello lai la minh day ", area);
    // }, [area])


    return (
        <div>
            <div style={{ background: color, width, height, display: 'inline-block' }}>
                {area} <br />
                {/* {doubleArea} */}
            </div>

            <button onClick={() => setColor('blue')}>blue</button>
            <button onClick={() => setColor('red')}>red</button>
            <button onClick={() => setColor('yellow')}>yellow</button>
            <input type='number' value={width} onChange={e => setWidth(+e.target.value)} />

        </div>
    )
}