import * as S from 'styles/Item'
import { useTranslationContext } from 'locales/translationContext'

type ItemsProps = {
  id: string
  name: string
  image: string
  species: string
  status: string
  width?: string
  height?: string
  onclick?: () => void
}

export default function ItemList({
  id,
  name,
  species,
  image,
  status,
  width = '283',
  height = '238',
  onclick
}: ItemsProps) {
  const translation = useTranslationContext()

  return (
    <S.Container onClick={onclick} id={'card-' + id}>   
      <S.ImageContainer
        src={image}
        alt={`${translation.IMAGE_EPISODE} ${name}`}
        width={width}
        height={height}
        objectFit="cover"
        title={status}
      />
      <S.Description>
        <div>
          <h2>{name}</h2>
          <span> {species} </span>
        </div>
      </S.Description>
    </S.Container>
  )
}
