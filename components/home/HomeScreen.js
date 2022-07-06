import React, {useEffect, useState} from 'react';
import { Button, StyleSheet, View, ScrollView, Text, Pressable } from 'react-native';
import { Players } from '../players/players';
import { useDispatch, useSelector } from 'react-redux';
import { startNewPlayer, startBulkUpdatingPlayers } from '../store/player/thunks';
import CheckBox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';


const HomeScreen = ({navigation}) => {
    console.log('home rendered')
    const dispatch = useDispatch();

    const {players} = useSelector( state => state.players );
    const selected = players.filter(player => player.selected).length;

    const [selectAll, setSelectAll] = useState(false);
    useEffect(() => {
        setSelectAll(selected === players.length);
    }, [selected, players])
    
    const handleAddPlayer = async() => {
        await dispatch(startNewPlayer());
        navigation.navigate('Profile');
    }

    const handleSelectAll = (val) => {
        setSelectAll(val);
        dispatch(startBulkUpdatingPlayers(val));
    }

    return (
        <View style={{backgroundColor:'#fff', flex:1}}>
            <View style={{flex:1, flexDirection:'row'}}>
                <CheckBox
                    value={selectAll}
                    onValueChange={handleSelectAll}
                    style={styles.checkbox}
                />
                <Text>Select all</Text>
            </View>
            <ScrollView style={{height:'70%'}}>
                <Players/>
            </ScrollView>
            <View style={{height:'20%'}}>
                <View style={styles.buttonContainer}>
                    <View
                        style={styles.btn} 
                    >
                        <Button
                            
                            title="Form Teams"
                            onPress={() => {
                                const {partition1:team1, partition2:team2} = findEqualPartitionMinSumDif(players.filter(player => player.selected))
                                navigation.navigate('Teams', {team1, team2})
                                }
                            }
                            disabled={selected < 2}
                        />
                    </View>
                    
                    <View
                        style={styles.btn}
                    >
                        <Button   
                            title="My Schedule"
                            onPress={() => {navigation.navigate('Schedule')}
                            }
                        />
                    </View>
                </View>
            </View>

            <Pressable
                onPress={handleAddPlayer}
                style={styles.fab}
            >
                <Icon name="add" size={30} style={{margin:10, color:'white'}}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        margin:5
    },
    fab:{
        width: 50,  
        height: 50,   
        borderRadius: 30,
        backgroundColor: '#00c851',                                    
        position: 'absolute',                                       
        bottom: 15,                                                    
        right: 15,
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    btn:{
        margin:5
    }
})

//overall O(n^2) time and O(n) space solution using a greedy approach
const findEqualPartitionMinSumDif = (players) => {
    //first sort the array - O(nlgn)
    players.sort((a,b) => a.weight-b.weight);
    const partition1 = [];
    const partition2 = [];

    //create index table to manage largest unused and smallest unused items
    //O(n) space and O(nlgn) time to build and query the set
    const unused = [];
    for(let i = 0; i<players.length; i++){
        const player = players[i];
        unused.push(player);
    }

    let i = 0;
    let j = unused.length-1;
    let part1Sum = 0;
    let part2Sum = 0;
    let diffSum = 0;

    //O(n^2) processing time
    while(unused.length > 0){
        i = 0;
        j = unused.length-1;
        diffSum = part1Sum-part2Sum;

        //in case of size of the array is not multiple of 4 then we need to process last 3(or 2 or 1)
        //element to assign partition. This is special case handling
        if(unused.length < 4){
            switch(unused.length){
                case 1:
                    //put the 1 remaining item into smaller partition
                    if(diffSum > 0){
                        partition2.push(unused[i]);
                        part2Sum += unused[i].weight;
                    }
                    else{
                        partition1.push(unused[i]);
                        part1Sum += unused[i].weight;
                    }
                    break;
                case 2:
                    //among the remaining 2 put the max in smaller and min in larger bucket
                    const max = unused[i].weight >= unused[j].weight ? unused[i] : unused[j];
                    const min = unused[i].weight <= unused[j].weight ? unused[i] : unused[j];
                    if(diffSum > 0){
                        partition2.push(max);
                        partition1.push(min);
                        part2Sum += max.weight;
                        part1Sum += min.weight;
                    }
                    else{
                        partition1.push(max);
                        partition2.push(min);
                        part1Sum += max.weight;
                        part2Sum += min.weight;
                    }
                    break;
                case 3:
                    //among the remaining 3 put the two having total value greater then the third one into smaller partition
                    //and the 3rd one to larger bucket
                    const middle = 1;
                    if(diffSum > 0){
                        if(unused[i].weight+unused[middle].weight > unused[j].weight){
                            partition2.push(unused[i]);
                            partition2.push(unused[middle]);
                            partition1.push(unused[j]);
                            part2Sum += unused[i].weight+unused[middle].weight;
                            part1Sum += unused[j].weight;
                        }
                        else{
                            partition2.push(unused[j]);
                            partition1.push(unused[i]);
                            partition1.push(unused[middle]);
                            part1Sum += unused[i].weight+unused[middle].weight;
                            part2Sum += unused[j].weight;
                        }
                    }
                    else{
                        if(unused[i].weight+unused[middle].weight > unused[j].weight){
                            partition1.push(unused[i]);
                            partition1.push(unused[middle]);
                            partition2.push(unused[j]);
                            part1Sum += unused[i].weight+unused[middle].weight;
                            part2Sum += unused[j].weight;
                        }
                        else{
                            partition1.push(unused[j]);
                            partition2.push(unused[i]);
                            partition2.push(unused[middle]);
                            part2Sum += unused[i].weight+unused[middle].weight;
                            part1Sum += unused[j].weight;
                        }
                    }
                    unused.splice(j, 1);
                    unused.splice(i, 1);
                    break;
                default:
            }

            diffSum = part1Sum-part2Sum;
            break;
        }

        //first take the largest and the smallest element to create a pair to be inserted into a partition
        //we do this for having a balanced distribute of the numbers in the partitions
        //add pair (i, j) to the smaller partition
        const pairSum = unused[i].weight+unused[j].weight;
        const partition = diffSum > 0 ? 2 : 1;
        if(partition == 1){
            partition1.push(unused[i]);
            partition1.push(unused[j]);
            part1Sum += pairSum;
        }
        else{
            partition2.push(unused[i]);
            partition2.push(unused[j]);
            part2Sum += pairSum;
        }

        //update diff
        diffSum = part1Sum-part2Sum;
        //we have used pair (i, j)
        unused.splice(j, 1);
        unused.splice(i, 1);
        //move j to next big element to the left
        j = unused.length-1;
        //now find the buddy for j to be paired with such that sum of them is as close as to pairSum
        //so we will find such buddy A[k], i<=k<j such that value of ((A[j]+A[k])-pairSum) is minimized.
        
        let buddyIndex = 0;
        let minPairSumDiff = Number.MAX_SAFE_INTEGER;
        for(let k = buddyIndex; k<j; k++){
            // if(!unused.contains(k))
            //     continue;

            let compPairSum = unused[j].weight+unused[k].weight;
            let pairSumDiff = Math.abs(pairSum-compPairSum);

            if(pairSumDiff < minPairSumDiff){
                minPairSumDiff = pairSumDiff;
                buddyIndex = k;
            }
        }

        //we now find buddy for j. So we add pair (j,buddyIndex) to the other partition
        if(j != buddyIndex){
            pairSum = unused[j].weight+unused[buddyIndex].weight;
            if(partition == 2){
                partition1.push(unused[j]);
                partition1.push(unused[buddyIndex]);
                part1Sum += pairSum;
            }
            else{
                partition2.push(unused[j]);
                partition2.push(unused[buddyIndex]);
                part2Sum += pairSum;
            }

            //we have used pair (j, buddyIndex)
            unused.splice(j, 1);
            unused.splice(buddyIndex, 1);
        }
    }

    // //if diffsum is greater than zero then we can further try to optimize by swapping
    // //a larger elements in large partition with an small element in smaller partition
    // //O(n^2) operation with O(n) space
    // if(diffSum != 0){
    //     Collections.sort(partition1);
    //     Collections.sort(partition2);

    //     diffSum = part1Sum-part2Sum;
    //     ArrayList<Integer> largerPartition = (diffSum > 0) ? partition1 : partition2;
    //     ArrayList<Integer> smallerPartition = (diffSum > 0) ? partition2 : partition1;

    //     int prevDiff = Math.abs(diffSum);
    //     int largePartitonSwapCandidate = -1;
    //     int smallPartitonSwapCandidate = -1;
    //     //find one of the largest element from large partition and smallest from the smaller partition to swap
    //     //such that it overall sum difference in the partitions are minimized
    //     for(i = 0; i < smallerPartition.size(); i++){
    //         for(j = largerPartition.size()-1; j>=0; j--){
    //             int largerVal = largerPartition.get(j);
    //             int smallerVal = smallerPartition.get(i);

    //             //no point of swapping larger value from smaller partition
    //             if(largerVal <= smallerVal){
    //                 continue;
    //             }

    //             //new difference if we had swapped these elements
    //             int diff = Math.abs(prevDiff - 2*Math.abs(largerVal - smallerVal));
    //             if(diff == 0){
    //                 largerPartition.set(j, smallerVal);
    //                 smallerPartition.set(i, largerVal);
    //                 return new ArrayList[]{largerPartition, smallerPartition};
    //             }
    //             //find the pair to swap that minimizes the sum diff
    //             else if (diff < prevDiff){
    //                 prevDiff = diff;
    //                 largePartitonSwapCandidate = j;
    //                 smallPartitonSwapCandidate = i;
    //             }
    //         }
    //     }

    //     //if we indeed found one such a pair then swap it.
    //     if(largePartitonSwapCandidate >=0 && smallPartitonSwapCandidate >=0){
    //         int largerVal = largerPartition.get(largePartitonSwapCandidate);
    //         int smallerVal = smallerPartition.get(smallPartitonSwapCandidate);
    //         largerPartition.set(largePartitonSwapCandidate, smallerVal);
    //         smallerPartition.set(smallPartitonSwapCandidate, largerVal);
    //         return new ArrayList[]{largerPartition, smallerPartition};
    //     }
    // }
    return {partition1, partition2};
}

export default HomeScreen;