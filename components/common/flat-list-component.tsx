import { useTheme } from "@/hooks"
import {
    FlatList,
    FlatListProps,
    ListRenderItem
} from 'react-native'
import RefreshControlComponent from './refresh-control-component'
import TextComponent from './text-component'

interface FlatListComponentProps extends FlatListProps<any> {
    data: any[]
    keyExtractor: (item: any) => string
    renderItem: ListRenderItem<any>
    onRefresh?: () => void
    refreshing?: boolean
    loadMore?: () => void
    isLoading?: boolean
    isFetchingNextPage?: boolean
    isError?: boolean
    numColumns?: number
    horizontal?: boolean
    showsHorizontalScrollIndicator?: boolean
    columnWrapperStyle?: FlatListProps<any>['columnWrapperStyle']
    contentContainerStyle?: FlatListProps<any>['contentContainerStyle']
}

export default function FlatListComponent({
    data = [],
    keyExtractor,
    renderItem,
    onRefresh,
    refreshing = false,
    loadMore,
    isLoading = false,
    isFetchingNextPage = false,
    isError = false,
    numColumns = 1,
    horizontal = false,
    showsHorizontalScrollIndicator = false,
    columnWrapperStyle,
    contentContainerStyle,
    ...props
}: FlatListComponentProps) {
    const { colors } = useTheme()
    return (
        <FlatList
            data={data}
            numColumns={numColumns}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            horizontal={horizontal}
            showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
            refreshControl={
                onRefresh ? (
                    <RefreshControlComponent
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                ) : undefined
            }
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
                (data.length < 1 && !isLoading) ? (
                    <TextComponent
                        textAlign='center'
                        type='caption'
                        text={isError ? 'error loading data' : 'no data found'}
                        style={{ marginVertical: 16 }}
                    />
                ) : null
            }
            ListFooterComponent={
                (isLoading || isFetchingNextPage) ? (
                    <TextComponent
                        textAlign='center'
                        type='caption'
                        text="loading"
                        style={{ marginVertical: 16 }}
                    />
                ) : data.length > 0 ? (
                    (
                        <TextComponent
                            textAlign='center'
                            type='caption'
                            text="end of page"
                            style={{ marginVertical: 16 }}
                        />
                    )
                ) : null
            }
            {...(numColumns > 1 && {
                columnWrapperStyle: [{
                    justifyContent: 'space-between',
                    gap: 8,
                }, columnWrapperStyle],
            })}
            contentContainerStyle={[{
                paddingHorizontal: 2,
                gap: 8,
            }, contentContainerStyle]}
            {...props}
        />
    )
}
