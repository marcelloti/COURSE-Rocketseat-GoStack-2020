import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api'

export default function App() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        console.log('teste')
        api.get('projects').then(response => {
            console.log(response.data)
            setProjects(response.data)
        })
    }, [])

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Marcello Costa'
        })

        const project = response.data;

        setProjects([...projects, project])
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <SafeAreaView style={styles.container}>
            <FlatList 
                data={projects}
                keyExtractor={project => project.id}
                renderItem={({ item: project }) => (
                    <Text style={styles.project}>
                        {project.title}
                    </Text>
                )}
            />
            {/*<View style={styles.container}>
                {projects.map(project => (
                        <Text key={project.id} style={styles.project}>
                            {project.title}
                        </Text>
                    )
                )}
            </View>*/}

            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.button}
                onPress={handleAddProject}
            >
                <Text style={styles.buttonText}>Adicionar projeto</Text>
            </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1'
    },

    project: {
        color: '#FFF',
        fontSize: 20
    },

    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,

    }
});