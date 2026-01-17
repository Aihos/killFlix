import { supabase } from '@/lib/supabase'
import { Movie } from '@/utils/movieUtills'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import React, { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import Loupe from './svg/loupe'

// Icône de fermeture
const CloseIcon = () => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <Path d="M18 6 6 18" />
        <Path d="M6 6 12 12" />
        <Path d="M12 12 18 18" />
    </Svg>
)

const HeaderPage = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [films, setFilms] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)

    // Charger les films quand on ouvre la popup
    useEffect(() => {
        if (isSearchOpen && films.length === 0) {
            const fetchFilms = async () => {
                setLoading(true)
                const { data, error } = await supabase
                    .from("film")
                    .select("*")
                    .order("nom_film", { ascending: true })

                if (!error && data) {
                    setFilms(data as Movie[])
                }
                setLoading(false)
            }
            fetchFilms()
        }
    }, [isSearchOpen, films.length])

    // Filtrer les films selon la recherche
    const filteredFilms = useMemo(() => {
        if (!searchQuery.trim()) return films
        const query = searchQuery.toLowerCase()
        return films.filter(film =>
            film.nom_film.toLowerCase().includes(query) ||
            film.realisateur_film.toLowerCase().includes(query)
        )
    }, [films, searchQuery])

    const handleClose = () => {
        setIsSearchOpen(false)
        setSearchQuery("")
    }

    const handleFilmPress = (filmId: number) => {
        handleClose()
        router.push(`/(tabs)/films/${filmId}/page`)
    }

    const renderFilmItem = ({ item }: { item: Movie }) => (
        <TouchableOpacity
            style={styles.filmItem}
            onPress={() => handleFilmPress(item.id)}
            activeOpacity={0.7}
        >
            <Image
                source={item.img_film}
                style={styles.filmImage}
                contentFit="cover"
            />
            <View style={styles.filmInfo}>
                <Text style={styles.filmTitle} numberOfLines={1}>
                    {item.nom_film}
                </Text>
                <Text style={styles.filmDirector}>
                    {item.realisateur_film}
                </Text>
                <Text style={styles.filmMeta}>
                    {item.duree_film} min • {new Date(item.date_film).getFullYear()}
                </Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => router.push('/')}>
                    <Image source={"https://media.pathe.fr/files/logo/logo.svg"} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => setIsSearchOpen(true)}>
                    <Loupe />
                </TouchableOpacity>
            </View>

            {/* Modal de recherche */}
            <Modal
                visible={isSearchOpen}
                animationType="fade"
                transparent={true}
                onRequestClose={handleClose}
            >
                <Pressable style={styles.modalOverlay} onPress={handleClose}>
                    <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
                        {/* Bouton fermer */}
                        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                            <CloseIcon />
                        </TouchableOpacity>

                        {/* Barre de recherche */}
                        <View style={styles.searchContainer}>
                            <View style={styles.searchInputWrapper}>
                                <View style={styles.searchIcon}>
                                    <Loupe />
                                </View>
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Avatar, Pathé Palace, IMAX..."
                                    placeholderTextColor="#888"
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    autoFocus
                                />
                            </View>
                        </View>

                        {/* Résultats */}
                        <View style={styles.resultsContainer}>
                            {loading ? (
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator size="large" color="#e50914" />
                                </View>
                            ) : filteredFilms.length === 0 ? (
                                <View style={styles.emptyContainer}>
                                    <Text style={styles.emptyText}>Aucun film trouvé</Text>
                                </View>
                            ) : (
                                <FlatList
                                    data={filteredFilms}
                                    renderItem={renderFilmItem}
                                    keyExtractor={(item) => item.id.toString()}
                                    showsVerticalScrollIndicator={false}
                                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                                />
                            )}
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}

export default HeaderPage

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        position: 'absolute',
        top: 20,
        width: '100%',
        zIndex: 10,
    },
    btn: {
        backgroundColor: '#ffffff33',
        padding: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffffff50',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingTop: 80,
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        maxWidth: 500,
        maxHeight: '80%',
    },
    closeButton: {
        position: 'absolute',
        top: -50,
        right: 0,
        padding: 10,
        zIndex: 10,
    },
    searchContainer: {
        marginBottom: 16,
    },
    searchInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ffffff20',
    },
    searchIcon: {
        paddingLeft: 16,
    },
    searchInput: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        paddingVertical: 16,
        paddingHorizontal: 12,
    },
    resultsContainer: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        maxHeight: 400,
        overflow: 'hidden',
    },
    loadingContainer: {
        paddingVertical: 40,
        alignItems: 'center',
    },
    emptyContainer: {
        paddingVertical: 40,
        alignItems: 'center',
    },
    emptyText: {
        color: '#888',
        fontSize: 16,
    },
    filmItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 12,
    },
    filmImage: {
        width: 60,
        height: 90,
        borderRadius: 8,
    },
    filmInfo: {
        flex: 1,
    },
    filmTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    filmDirector: {
        color: '#aaa',
        fontSize: 14,
        marginTop: 4,
    },
    filmMeta: {
        color: '#666',
        fontSize: 12,
        marginTop: 4,
    },
    separator: {
        height: 1,
        backgroundColor: '#ffffff15',
    },
})