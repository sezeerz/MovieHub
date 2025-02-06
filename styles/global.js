import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    contentWrapper: {
        padding: 20
    }, 
    backButton: {
        position: 'absolute',
        top: 35,
        left: 50,
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderRadius: 50,
    },
    favoriteButton: {
        position: 'absolute',
        top: 35,
        right: 50,
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderRadius: 50,
    },
    shareButton: {
        position: 'absolute',
        top: 100,
        right: 50,
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderRadius: 50,
    },
    navbar: {
        backgroundColor: '#151515', 
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,

        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',  
        padding: 20, 
        borderRadius: 20, 
    },
    navbarItem: {
        display: 'flex',    
        flexDirection: 'column', 
        alignItems: 'center',  
        justifyContent: 'center',
        width: '33%',
        height: 50, 
        borderRadius: 10, 
    }, 
    activeNavbarItem: {
        color: 'white'
    }, 
    navbarText: {
        fontSize: 10, 
        marginTop: 5,
    },
    rowList: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    h1title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
    h2title: {
        fontSize: 16,
        fontWeight: 'regular',
        color: '#fff',
    }, 
    modalContainer: {  
        backgroundColor: '#151515',
        marginHorizontal: 20, 
        borderRadius: 20,
        marginTop: 110,
        width: '50%',
    }, 
    modalOverlay: {
        position: 'absolute', 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {  
        padding: 20, 
        borderRadius: 20 

    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#151515',
        borderRadius: 20,
        padding: 15
    },
    searchInput: {
        color: '#414141',
        fontSize: 16,
        padding: 5,
        fontWeight: 'regular', 
        width: '100%',
        overflow: 'hidden', 
        marginLeft: 10,
        zIndex: 1000,
    }, 
    smallCard: { 
        width: 120,
        height: 160,
        backgroundColor: '#151515',
        borderRadius: 10,
        marginRight: 10, 
    },
    smallCardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    smallCardTitle: {
        color: 'white',
        fontSize: 14,   
        fontWeight: 'regular', 
        position: 'absolute',
        bottom: 20,

        left: 0,
        right: 0,
        textAlign: 'center', 
    },
    mediumCard: {
        width: 150,
        height: 250,
        backgroundColor: '#151515',
        borderRadius: 10,
        marginRight: 10,
    }, 
    mediumCardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    progressBarContainer: { 
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0, 
        padding: 5,  
        margin: 5,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    progressBar: {
        width: '100%', 
        height: 2,
        backgroundColor: 'rgba(65, 65, 65, 0.8)',
        borderRadius: 10,   
    },
    progressBarFill: {
        width: '50%',
        height: 2,
        backgroundColor: 'white',
        borderRadius: 10 
    },
    
    
    //User Movie View
    cardViewContainer: {
        width: '90%',
        height: 'auto',  
        marginHorizontal: 'auto',
    },
    overviewContainer: {
        width: '100%',
        height: 'auto',
        padding: 20,
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: '#151515'  
    }, 
    cardView: {
        width: '100%',
        height:  500, 
        backgroundColor: '#151515', 
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    jokerLine: {
        width: '12%',
        height: 3,
        borderRadius: 20,
        backgroundColor: '#414141',
        marginBottom: 20,
        marginHorizontal: 'auto',
    }, 
    posterImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20  
    }, 
    cardViewContent: {
        width: 'auto',
        height: 'auto', 
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'absolute',
        borderRadius: 20,
        bottom: 0,
        left: 0,
        right: 0, 
        margin: 20, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryText: {
        fontSize: 12,
        fontWeight: 'regular',
        color: '#fff',
    },
    detailsContainer: {
        marginVertical: 10,
        gap: 8,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    detailLabel: {
        color: '#fff',
        fontWeight: 'bold',
    },
    overviewTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    castContainer: {
        marginTop: 10,
        gap: 12,
    },
    castMember: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    castImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    castInfo: {
        flex: 1,
    }, 
    profileImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 50,
        marginHorizontal: 'auto',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'white',
    }, 
    categoryItem: {
        flex: 1,
        backgroundColor: '#1F1F1F',
        borderRadius: 8,
        padding: 15,
        margin: 8,
        height: 120,
        justifyContent: 'space-between'
      },
      categoryTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
      },
      categoryCount: {
        color: '#666',
        fontSize: 14
      },
      gridRow: {
        justifyContent: 'space-between'
      }
});