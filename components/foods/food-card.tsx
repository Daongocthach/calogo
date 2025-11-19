
import ButtonComponent from '@/components/common/button-component'
import CardContainer from '@/components/common/card-container'
import ColumnComponent from '@/components/common/column-component'
import RowComponent from '@/components/common/row-component'
import TextComponent from '@/components/common/text-component'
import CategoryIcon from '@/components/foods/category-icon'

import { Food } from '@/lib'

export default function FoodCard(food: Food) {

    if (!food) {
        return null
    }

    return (
        <CardContainer>
            <RowComponent justify="space-between">
                <RowComponent gap={10}>
                    <CategoryIcon
                        icon={"Leaf"}
                        iconColor={"#22C55E"}
                        backgroundColor={`#22C55E30`}
                    />
                    <ColumnComponent>
                        <TextComponent text={food.name} type="title1" />
                        <TextComponent
                            text={food.calories + " kcal per " + food.unit}
                            type="caption"
                            color="textSecondary"
                        />
                    </ColumnComponent>
                </RowComponent>

                <RowComponent gap={10}>
                    <ButtonComponent icon='Trash' />
                    <ButtonComponent icon='Pencil' />
                </RowComponent>
            </RowComponent>

        </CardContainer>
    )
}
