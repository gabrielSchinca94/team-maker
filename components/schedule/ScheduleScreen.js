import React, {useState} from 'react';
import { StyleSheet, View, Pressable, Text, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell, Col } from 'react-native-table-component-2';

export const ScheduleScreen = () => {
    
    const [data, setData] = useState(
        [
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
            ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ]
    );

    const getTime = (i, a, c) => {
        let res = (c*100).toString();
        while(res.length < 4){
            res = '0' + res;
        }
        return res[0] + res[1] + '.' + res[2] + res[3];
    }

    const getCell = (data, index, rowIndex) => {
        return (
        <Pressable style={{width:'100%', height:'100%'}} onPress={() => changeData(data, index, rowIndex)}>
          <View style={data === 'true' ? styles.btnTrue : styles.btnFalse}></View>
        </Pressable>
    )};

    const changeData = (cellValue, cellIndex, rowIndex) => {
        const newData = [...data];
        newData[rowIndex][cellIndex] = cellValue === 'true' ? 'false' : 'true';
        setData(newData);
    }

    const state = {
        tableHead: ['', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        tableData: data,
    }

    return (
        <View style={styles.container}>
            <Table borderStyle={{borderWidth: 1}}>
                <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                {state.tableData.map((rowData, rowIndex) => (
                    <TableWrapper key={rowIndex} style={styles.row}>
                        {rowData.map((cellData, cellIndex, a) => (
                            <Cell
                            key={cellIndex}
                            data={cellIndex === 0 ? getTime(cellData, cellIndex, rowIndex) : getCell(cellData, cellIndex, rowIndex)}
                            textStyle={styles.text}
                            />
                        ))}
                    </TableWrapper>
                ))}
            </Table>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    head: {
        height: 40,
        backgroundColor: '#808B97'
    },
    text: { 
        margin: 6
    },
    row: { 
        flexDirection: 'row',
        backgroundColor: '#FFF1C1' 
    },
    btn: { 
        width: 58,
        height: 18,
        backgroundColor: '#78B7BB',
        borderRadius: 2
    },
    btnTrue: { 
        textAlign: 'center',
        backgroundColor: 'green',
        width:'100%',
        height:'100%' 
    },
    btnFalse: { 
        textAlign: 'center',
        backgroundColor: 'red',
        width:'100%',
        height:'100%'
    },
});
